<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px" class="detail-dialog">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" page="1">
          <v-icon color="black">add_box</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Lipstick To This Branch</span>
          <span style="float:right; margin-left: 250px">{{page}}/3</span>
        </v-card-title>
        <!-- Page 1-->
        <div v-if="page == 1">
          <template>
            <v-card-text>
              <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-select
                      v-model="brand_id"
                      :items="brands.data"
                      label="Select brand*"
                      item-text="name"
                      item-value="id"
                      :rules="[v => !!v || 'Brand is required']"
                      required
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-form>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions style="margin: 0 187px 0 187px">
              <v-btn color="black darken-1" @click="closeDialog">Close</v-btn>
              <div @click="validate" style="margin: 30px">
                <v-btn color="blue darken-1" @click="onNextClick" :disabled="!valid">Next</v-btn>
              </div>
            </v-card-actions>
          </template>
        </div>

        <!-- Page 2-->
        <div v-else-if="page == 2">
          <template>
            <v-card-text>
              <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-select
                      v-model="detail_id"
                      :items="details.data"
                      label="Select collection*"
                      item-text="name"
                      item-value="id"
                      :rules="[v => !!v || 'Collection is required']"
                      required
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-form>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions style="margin: 0 187px 0 187px">
              <v-btn color="black darken-1" @click="onBackClick">Back</v-btn>
              <div @click="validate" style="margin: 30px">
                <v-btn color="blue darken-1" @click="onNextClick" :disabled="!valid">Next</v-btn>
              </div>
            </v-card-actions>
          </template>
        </div>

        <div v-else-if="page == 3">
          <!-- Page 3-->
          <template>
            <v-card-text>
              <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-select
                      v-model="selected"
                      :items="colors"
                      item-text="color_name"
                      item-value="id"
                      label="Select lipstick colors"
                      multiple
                      chips
                      :rules="[v => !!v || 'Color name is required']"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="price" label="Price*" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions style="margin: 0 187px 0 187px">
              <v-btn color="black darken-1" @click="onBackClick">Back</v-btn>
              <div @click="validate" style="margin: 30px">
                <v-btn color="blue darken-1" @click="onAddClick" :disabled="!valid">Save</v-btn>
              </div>
            </v-card-actions>
          </template>
        </div>
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
    async onNextClick() {
      this.page++;
    },
    async onBackClick() {
      this.page--;
    },
    async getBrands() {
      const { data } = await axios.get(`api/brand`);
      this.brands = data;
    },
    async getDetails() {
      const { data } = await axios.get(`api/brand/${this.brand_id}/detail`);
      this.details = data;
    },
    async getColors() {
      const { data } = await axios.get(
        `api/lipstick/detail/${this.detail_id}?part=color`
      );
      this.colors = data.data.colors;
    },
    closeDialog() {
      this.dialog = false;
      this.brand_id = "";
      this.detail_id = "";
      this.price = 0;
      this.page = 1;
    },
    ...mapActions(["setLipstickOfStoreAddress"]),
    async onAddClick() {
      for (let i = 0; i < this.selected.length; i++) {
        let formData = new FormData();
        formData.append("price", this.price);
        formData.append("lipstick_color_id", this.selected[i]);
        formData.append("store_address_id", this.$route.params.id);
        await axios.post(`api/store/address/lipsticks`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }
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
        `api/store/address/${this.$route.params.id}/lipstickColors?part=brand,detail`
      );

      this.setLipstickOfStoreAddress(data.data);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  async mounted() {
    this.getBrands();
    this.validate();
  },
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    price: 0,
    brands: [],
    details: [],
    colors: [],
    selected: [],
    page: 1,
    brand_id: [],
    detail_id: []
  }),
  watch: {
    dialog(val) {
      if (!val) {
        this.page = 1;
      }
    },
    brand_id(newVal) {
      console.log(newVal);
      this.getDetails();
    },
    detail_id(newVal) {
      console.log(newVal);
      this.getColors();
    }
  }
};
</script>