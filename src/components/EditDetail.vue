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
          <span class="headline">Edit Lipstick Detail</span>
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
                <v-select
                  v-model="props.item.type"
                  :items="types"
                  label="Type*"
                  item-text="type"
                  :rules="[v => !!v || 'Type is required']"
                  return-object
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.opacity"
                  label="Opacity*"
                  type="double"
                  :rules="opacityRules"
                  required
                ></v-text-field>
                <!-- <v-slider v-model="slider" class="align-center" :max="max" :min="min" hide-details> -->
                <!-- <template v-slot:append>
                    <v-text-field
                      v-model="slider"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                    ></v-text-field>
                  </template>
                </v-slider>-->
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.description"
                  label="Description*"
                  :rules="descriptionRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="props.item.apply"
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
    ...mapActions(["setDetail"]),
    async onEditClick() {
      console.log("name", this.props.item.name);
      console.log("type", this.props.item.type.type);
      console.log("name", this.props.item.opacity);
      console.log("name", this.props.item.description);
      console.log("name", this.props.item.apply);
      console.log("name", this.$route.params.id);
      await axios.put(`api/lipstick/detail/` + this.props.item.id, {
        name: this.props.item.name,
        type: this.props.item.type.type,
        opacity: this.props.item.opacity,
        description: this.props.item.description,
        apply: this.props.item.apply,
        lipstick_brand_id: this.$route.params.id
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
  props: ["props"],
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    type: "",
    opacity: null,
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
    lipstick_brand_id: null,
    types: [],
    min: 0.1,
    max: 1.0,
    slider: 0.5
  }),
  computed: {
    ...mapGetters(["getDetail"])
  }
};
</script>
