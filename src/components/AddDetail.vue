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
          <span class="headline">Add Lipstick Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="name" label="Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="type"
                  :items="types.data"
                  label="Type*"
                  item-text="type"
                  return-object
                ></v-combobox>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="max_price" label="Max Price*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="min_price" label="Min Price*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="opacity" label="Opacity*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="description" label="Description*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="apply" label="Apply*" required></v-text-field>
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
    ...mapActions(["setDetail"]),
    async onAddClick() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("type", this.type);
      formData.append("max_price", this.max_price);
      formData.append("min_price", this.min_price);
      formData.append("opacity", this.opacity);
      formData.append("description", this.description);
      formData.append("apply", this.apply);
      formData.append("lipstick_brand_id", this.$route.params.id);
      await axios.post(`lipstick/detail`, formData, {
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
        `http://18.136.104.217/api/brand/` + this.$route.params.id + `/detail`
      );

      this.setDetail(data.data);
    },
    async getType() {
      const { data } = await axios.get(`lipstick/detail/type`);
      this.types = data;
    },
    closeDialog() {
      this.dialog = false;
      this.name = "";
      this.type = "";
      this.max_price = 0;
      this.min_price = 0;
      this.opacity = 1;
      this.description = "";
      this.apply = "";
    }
  },
  async mounted() {
    this.getType();
  },
  data: () => ({
    dialog: false,
    name: "",
    type: "",
    max_price: 0,
    min_price: 0,
    opacity: 1,
    description: "",
    apply: "",
    types: []
  }),
  computed: {
    ...mapGetters(["getDetail"])
  }
};
</script>