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
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="props.item.address_detail" label="Detail*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.latitude" label="Latitude*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.longtitude" label="Longtitude*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.period" label="Time Available" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.tel" label="Tel" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
          <div @click="dialog = false" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onEditClick">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setStoreAddress"]),
    async onEditClick() {
      await axios.put(
        `http://18.136.104.217/api/store/address/${this.props.item.id}`,
        {
          address_detail: this.props.item.address_detail,
          latitude: this.props.item.latitude,
          longtitude: this.props.item.longtitude,
          period: this.props.item.period,
          tel: this.props.item.tel,
          store_id: this.$route.params.id
        }
      );
      this.$forceUpdate();
      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });
      const { data } = await axios.get(
        `http://18.136.104.217/api/store/${this.$route.params.id}?part=address`
      );
      this.setStoreAddress(data.data.addresses);
    }
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    detail: "",
    latitude: null,
    longtitude: null,
    period: null,
    tel: null,
    store_id: null
  }),
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>
