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
                <v-text-field v-model="address_detail" label="Addrss Detail*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="latitude" label="Latitute*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="longtitude" label="Longtitute*" required></v-text-field>
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
      formData.append("address_detail", this.address_detail);
      formData.append("latitude", this.latitude);
      formData.append("longtitude", this.longtitude);
      formData.append("store_id", this.$route.params.id);
      await axios.post(`http://18.136.104.217/api/store/address`, formData, {
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
        `http://18.136.104.217/api/store/` +
          this.$route.params.id +
          `?part=address`
      );

      this.setStoreAddress(data.data.addresses);
    },
    // async getType() {
    //   const { data } = await axios.get(`lipstick/detail/type`);
    //   this.types = data;
    // },
    closeDialog() {
      this.dialog = false;
      this.address_detail = "";
      this.latitude = 0;
      this.longtitude = 0;
    }
  },
  async mounted() {
    // this.getType();
  },
  data: () => ({
    dialog: false,
    address_detail: "",
    latitude: 0,
    longtitude: 0
    // types: []
  }),
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>