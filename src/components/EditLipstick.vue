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
          <span class="headline">Edit Lipstick</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="props.item.brand.name" label="Brand*" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.detail.name" label="Collection*" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.price" label="Price*" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*user can edit only price field</small>
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
import axios from "../utils/axios.js";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setLipstickOfStoreAddress"]),
    async onEditClick() {
      await axios.put(
        `api/store/address/lipsticks/` +
          this.props.item.id_pivot,
        {
          price: this.props.item.price,
          lipstick_color_id: this.props.item.lipstick_color_id,
          store_address_id: this.$route.params.id
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
        `api/store/address/${this.$route.params.id}/lipstickColors?part=brand,detail`
      );
      this.setLipstickOfStoreAddress(data.data);
    }
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    price: null,
    lipstick_color_id: null,
    store_address_id: null
  }),
  computed: {
    ...mapGetters(["getLipstickOfStoreAddress"])
  }
};
</script>
