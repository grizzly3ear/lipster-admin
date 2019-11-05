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
          <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="props.item.brand.name" label="Brand*" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.detail.name" label="Collection*" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="price"
                  label="Price*"
                  :rules="priceRules"
                  type="number"
                  min="0"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  v-model="checkbox"
                  label="Do you want edit all color's price in this collection?"
                  required
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-form>
          <small>*user can edit only price field</small>
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
    ...mapActions(["setLipstickOfStoreAddress"]),
    async onEditClick() {
      if (this.checkbox) {
        this.getLipstickOfStoreAddress.forEach(async lipstick => {
          console.log("edit multi");
          if (this.props.item.detail.id == lipstick.detail.id) {
            await axios.post(
              `api/store/address/lipsticks/` + lipstick.id_pivot,
              {
                price: this.price,
                lipstick_color_id: lipstick.lipstick_color_id,
                store_address_id: this.$route.params.id
              }
            );
          }
        });
      } else {
        console.log("edit once");
        await axios.post(
          `api/store/address/lipsticks/` + this.props.item.id_pivot,
          {
            price: this.price,
            lipstick_color_id: this.props.item.lipstick_color_id,
            store_address_id: this.$route.params.id
          }
        );
      }
      this.dialog = false;
      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });
      console.log("get lip");
      // const { data } = await axios.get(
      //   `api/store/address/${this.$route.params.id}/lipstickColors?part=brand,detail`
      // );
      // console.log("edit:", data.data);
      // this.setLipstickOfStoreAddress(data.data);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    async fetchData() {
      const { data } = await axios.get(
        `api/store/address/${this.$route.params.id}/lipstickColors?part=brand,detail`
      );
      this.setLipstickOfStoreAddress(data.data);
    }
  },
  beforeMount() {
    this.price = this.props.item.price;
  },
  mounted() {
    this.timer = setInterval(this.fetchData, 5000);
    this.validate();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapGetters(["getLipstickOfStoreAddress"])
  },
  props: ["props"],
  data: () => ({
    timer: () => {},
    dialog: false,
    valid: false,
    price: null,
    priceRules: [
      v => !!v || "Price is required",
      v => (v && v >= 0) || "Price can not be less than 0 baht"
    ],
    lipstick_color_id: null,
    store_address_id: null,
    checkbox: true
  })
};
</script>
