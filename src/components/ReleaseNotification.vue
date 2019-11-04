<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="ma-2" tile outlined color="blue" v-on="on">
          <v-icon style="font-size: 16px">edit</v-icon>Release
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Release Trend</span>
        </v-card-title>
        <v-card-text>
          <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <h3>Example of Notification:</h3>
              <div
                style="width: 400px; height: 92px; border: 1.5px solid #D5DBDB;  border-radius: 2px;"
              >
                <div style="float: left; width: 70px; height: 70px; margin: 8px;">
                  <img
                    style="width: 70px; height: 70px;"
                    :src="require('../assets/lip_logo_black.png')"
                  />
                </div>
                <div style="float: right; width: 295px; height: 70px; margin: 8px 8px 8px 0;">
                  <label style="font-weight: bold; font-size: 14px" v-text="props.item.name"></label>
                  <br />
                  <label style="font-size: 12px" v-text="props.item.description"></label>
                </div>
              </div>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Title*"
                  :rules="nameRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="description"
                  label="Body*"
                  :rules="descriptionRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-spacer></v-spacer>
          <v-btn color="black" @click="dialog = false">Close</v-btn>
          <div @click="validate" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onEditClick" :disabled="!valid">Release</v-btn>
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
    ...mapActions(["setTrendCollection"]),
    async onEditClick() {
      let formData = new FormData();
      formData.append("release", true);
      formData.append("title", this.props.item.name);
      formData.append("body", this.props.item.description);
      formData.append("image", this.props.item.image);
      await axios.post(
        `api/trend/collection/${this.props.item.id}/release`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      const { data } = await axios.get(`api/trend/collection?part=trend`);
      this.setTrendCollection(data.data);
      this.dialog = false;
      this.$forceUpdate();
      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  beforeMount() {
    this.image = this.props.item.image;
    this.name = this.props.item.name;
    this.description = this.props.item.description;
    this.release_date = this.props.item.release_date;
  },
  async mounted() {
    this.validate();
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    valid: false,
    example: "Example: ",
    title: "",
    nameRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 190) || "Title be less than 190 characters"
    ],
    body: "",
    descriptionRules: [
      v => !!v || "Body is required",
      v => (v && v.length <= 190) || "Body be less than 190 characters"
    ],
    name: "",
    description: "",
    release_date: "",
    image: ""
  })
};
</script>