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
                  v-model="props.item.name"
                  label="Name*"
                  :rules="nameRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.address_detail"
                  label="Detail*"
                  :rules="addressDetailRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.latitude"
                  label="Latitude*"
                  :rules="latitudeRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.longitude"
                  label="Longitude*"
                  :rules="longitudeRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.period"
                  label="Time Available"
                  :rules="timeRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.tel"
                  label="Tel"
                  :rules="telRules"
                  :counter="10"
                  required
                ></v-text-field>
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
        name: this.props.item.name,
        address_detail: this.props.item.address_detail,
        latitude: this.props.item.latitude,
        longitude: this.props.item.longitude,
        period: this.props.item.period,
        tel: this.props.item.tel,
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
    detail: "",
    address_detail: "",
    addressDetailRules: [
      v => !!v || "Address detail is required",
      v => (v && v.length <= 190) || "Address detail be less than 30 characters"
    ],
    latitude: null,
    latitudeRules: [
      v => !!v || "Latitude is required",
      v => (v && v.length <= 30) || "Latitude be less than 30 characters"
    ],
    longitude: null,
    longitudeRules: [
      v => !!v || "Longitude is required",
      v => (v && v.length <= 30) || "Longitude be less than 30 characters"
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
