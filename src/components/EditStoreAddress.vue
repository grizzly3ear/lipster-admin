<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon color="black">edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Store Address</span>
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
                  label="Detail*"
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
                  type="number"
                  min="-180"
                  max="180"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="period"
                  label="Time Available"
                  :rules="timeRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="tel" label="Tel" :rules="telRules" :counter="10" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
          <div @click="validate" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onEditClick" :disabled="!valid">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../utils/axios.js";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setStoreAddress"]),
    async onEditClick() {
      await axios.put(`api/store/address/${this.props.item.id}`, {
        name: this.name,
        address_detail: this.address_detail,
        latitude: this.latitude,
        longitude: this.longitude,
        period: this.period,
        tel: this.tel,
        store_id: this.$route.params.id
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
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  beforeMount() {
    this.name = this.props.item.name;
    this.address_detail = this.props.item.address_detail;
    this.latitude = this.props.item.latitude;
    this.longitude = this.props.item.longitude;
    this.period = this.props.item.period;
    this.tel = this.props.item.tel;
  },
  async mounted() {
    this.validate();
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name be less than 30 characters"
    ],
    address_detail: "",
    address_detail: "",
    addressDetailRules: [
      v => !!v || "Address detail is required",
      v => (v && v.length <= 190) || "Address detail be less than 30 characters"
    ],
    latitude: null,
    latitudeRules: [
      v => !!v || "Latitude is required",
      v => (v && v >= -90) || "Latitude must be more than or equal -90",
      v => (v && v <= 90) || "Latitude must be less than or equal 90"
    ],
    longitude: null,
    longitudeRules: [
      v => !!v || "Longitude is required",
      v => (v && v >= -180) || "Longitude must be more than or equal -180",
      v => (v && v <= 180) || "Longitude must be less than or equal 180"
    ],
    period: null,
    timeRules: [
      v => !!v || "Time available is required",
      v => (v && v.length <= 30) || "Time available be less than 30 characters"
    ],
    tel: null,
    telRules: [
      v => !!v || "Tel is required",
      v => (v && v.length == 10) || "Tel must be 10 characters"
    ],
    store_id: null
  }),
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>
