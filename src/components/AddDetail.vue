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
                <v-select
                  v-model="type"
                  :items="types"
                  label="Type*"
                  item-text="type"
                  :rules="[v => !!v || 'Type is required']"
                  return-object
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="opacity"
                  label="Opacity*"
                  type="double"
                  :rules="opacityRules"
                  required
                ></v-text-field>
                <!-- <vs-input-number v-model="opacity" :step="0.10" min="0.10" max="0.90" /> -->
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="description"
                  label="Description*"
                  :rules="descriptionRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="apply"
                  label="Apply*"
                  :rules="applyRules"
                  :counter="190"
                  required
                ></v-text-field>
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
import axios from "../utils/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setDetail"]),
    async onAddClick() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("type", this.type.type);
      formData.append("opacity", this.opacity);
      formData.append("description", this.description);
      formData.append("apply", this.apply);
      formData.append("lipstick_brand_id", this.$route.params.id);
      await axios.post(`api/lipstick/detail`, formData, {
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
        `api/brand/${this.$route.params.id}/detail?part=color`
      );

      this.setDetail(data.data);
    },
    async getType() {
      const { data } = await axios.get(`api/lipstick/detail/type`);
      this.types = data.data;
    },
    closeDialog() {
      this.dialog = false;
      this.name = "";
      this.type = "";
      this.opacity = 0.5;
      this.description = "";
      this.apply = "";
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  async mounted() {
    this.getType();
    this.validate();
  },
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    type: "",
    opacity: 0.5,
    opacityRules: [v => !!v || "Opacity is required"],
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length <= 190) || "Description must be less than 190 characters"
    ],
    apply: "",
    applyRules: [
      v => !!v || "Apply is required",
      v => (v && v.length <= 190) || "Apply must be less than 190 characters"
    ],
    types: []
  }),
  computed: {
    ...mapGetters(["getDetail"])
  }
};
</script>