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
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="name" label="Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="address_detail" label="Addrss Detail*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="latitude" label="Latitute*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="longitude" label="Longitute*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="period" label="Time Available" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="tel" label="Tel" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-btn color="blue darken-1" @click="closeDialog">Close</v-btn>
          <div @click="dialog = false" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onAddClick">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../utils/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setStoreAddress"]),
    async onAddClick() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("address_detail", this.address_detail);
      formData.append("latitude", this.latitude);
      formData.append("longitude", this.longitude);
      formData.append("period", this.period);
      formData.append("tel", this.tel);
      formData.append("store_id", this.$route.params.id);
      await axios.post(`api/store/address`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
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
    }
  },
  async mounted() {},
  data: () => ({
    dialog: false,
    name: "",
    address_detail: "",
    latitude: 0,
    longitude: 0,
    period: "",
    tel: ""
  }),
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>