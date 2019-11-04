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
                  v-model="name"
                  label="Name*"
                  :rules="nameRules"
                  :counter="50"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  :items="types"
                  label="Type*"
                  item-text="type"
                  v-model="type"
                  :rules="[v => !!v || 'Type is required']"
                  return-object
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="opacity"
                  label="Opacity*"
                  type="number"
                  min="10"
                  max="100"
                  suffix="%"
                  :step="10"
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
      let lipstickType;
      if (this.type.type) {
        lipstickType = this.type.type;
      } else {
        lipstickType = this.type;
      }
      await axios.put(`api/lipstick/detail/` + this.props.item.id, {
        name: this.name,
        type: lipstickType,
        opacity: this.opacity / 100,
        description: this.description,
        apply: this.apply,
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
  beforeMount() {
    this.name = this.props.item.name;
    this.type = this.props.item.type;
    this.opacity = this.props.item.opacity * 100;
    this.description = this.props.item.description;
    this.apply = this.props.item.apply;
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
      v => (v && v.length <= 50) || "Name must be less than 50 characters"
    ],
    type: "",
    opacity: null,
    opacityRules: [
      v => !!v || "Opacity is required",
      v => (v && v >= 10) || "Opacity must be more than or equal 10 percents",
      v => (v && v <= 100) || "Opacity must be less than or equal 100 percents"
    ],
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
