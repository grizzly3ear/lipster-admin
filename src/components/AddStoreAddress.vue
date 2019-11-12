<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px" class="detail-dialog">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon color="black">add_box</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Store Address</span>
        </v-card-title>
        <v-card-text>
          <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name*"
                  :rules="nameRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="address_detail"
                  label="Addrss Detail*"
                  :rules="addressDetailRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="latitude"
                  label="Latitude*"
                  :rules="latitudeRules"
                  :counter="20"
                  type="number"
                  min="-90"
                  max="90"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="longitude"
                  label="Longitude*"
                  :rules="longitudeRules"
                  :counter="20"
                  type="number"
                  min="-180"
                  max="180"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="tel" label="Tel" :rules="telRules" :counter="10" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <p style="margin-top: 20px;">
                  <label style="margin: 0 20px 0 0;">Time Available</label>
                  <vue-timepicker
                    v-model="start_time"
                    placeholder="Start Time"
                    :minute-interval="5"
                    hide-disabled-items
                    style="margin: 0 10px 0 10px;"
                  ></vue-timepicker>
                  <span>to</span>
                  <vue-timepicker
                    v-model="end_time"
                    placeholder="End Time"
                    :minute-interval="5"
                    hide-disabled-items
                    style="margin: 0 10px 0 10px;"
                  ></vue-timepicker>
                </p>
              </v-flex>
            </v-layout>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-btn color="blue darken-1" @click="closeDialog">Close</v-btn>
          <div @click="validate" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onAddClick" :disabled="!valid">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import axios from "../utils/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { VueTimepicker },
  methods: {
    ...mapActions(["setStoreAddress"]),
    async onAddClick() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("address_detail", this.address_detail);
      formData.append("latitude", this.latitude);
      formData.append("longitude", this.longitude);
      formData.append(
        "period",
        this.start_time.HH +
          "." +
          this.start_time.mm +
          ";" +
          this.end_time.HH +
          "." +
          this.end_time.mm
      );
      formData.append("tel", this.tel);
      formData.append("store_id", this.$route.params.id);
      await axios.post(`api/store/address`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      this.dialog = false;
      this.$forceUpdate();
      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });

      const { data } = await axios.get(
        `api/store/${this.$route.params.id}?part=address`
      );

      this.setStoreAddress(data.data.addresses);
    },
    closeDialog() {
      this.dialog = false;
      this.name = "";
      this.address_detail = "";
      this.latitude = 0;
      this.longitude = 0;
      this.period = "";
      this.tel = "";
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  async mounted() {
    this.validate();
  },
  data: () => ({
    dialog: false,
    valid: false,
    start_time: { HH: "08", mm: "00" },
    end_time: { HH: "22", mm: "00" },
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name be less than 30 characters"
    ],
    address_detail: "",
    addressDetailRules: [
      v => !!v || "Address detail is required",
      v => (v && v.length <= 190) || "Address detail be less than 30 characters"
    ],
    latitude: 0,
    latitudeRules: [
      v => !!v || "Latitude is required",
      v => (v && v.length <= 20) || "Latitude be less than 20 characters",
      v => (v && v >= -90) || "Latitude must be more than or equal -90",
      v => (v && v <= 90) || "Latitude must be less than or equal 90"
    ],
    longitude: 0,
    longitudeRules: [
      v => !!v || "Longitude is required",
      v => (v && v.length <= 20) || "Longitude be less than 20 characters",
      v => (v && v >= -180) || "Longitude must be more than or equal -90",
      v => (v && v <= 180) || "Longitude must be less than or equal 90"
    ],
    period: "",
    timeRules: [
      v => !!v || "Time available is required",
      v => (v && v.length <= 30) || "Time available be less than 30 characters"
    ],
    tel: "",
    telRules: [
      v => !!v || "Tel is required",
      v => (v && v.length == 10) || "Tel must be 10 characters"
    ]
  }),
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>
