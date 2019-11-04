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
          <span class="headline">Edit Trend Collection</span>
        </v-card-title>
        <v-card-text>
          <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name*"
                  :rules="nameRules"
                  :counter="190"
                  required
                ></v-text-field>
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
                <v-text-field v-model="release_date" label="Release Date*" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <input ref="files" type="file" @change="onFileSelected" accept="image/*" />
                <div class="image-preview">
                  <img class="preview" :src="selectedFile" />
                </div>
              </v-flex>
            </v-layout>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
          <div @click="validate" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onEditClick" :disabled="!valid">Edit</v-btn>
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
    onFileSelected: function(event) {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = e => {
        this.selectedFile = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    },
    async encodeToBase64(files) {
      var attach;
      var reader;

      attach = await this.FileToBase64(files, reader);

      return attach.split(",")[1];
    },

    FileToBase64(files, reader) {
      reader = new FileReader();
      reader.readAsDataURL(files[0]);

      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject("Can not upload this image");
        };
        reader.onload = function() {
          resolve(reader.result);
        };
      });
    },
    ...mapActions(["setTrendCollection"]),
    async onEditClick() {
      let image = null;
      try {
        image = await this.encodeToBase64(this.$refs.files.files);
      } catch (e) {
        console.error(e);
        image = null;
      }
      await axios.put(`api/trend/collection/` + this.props.item.id, {
        name: this.name,
        description: this.description,
        release_date: this.release_date,
        image: image
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
      const { data } = await axios.get(`api/trend/collection?part=trend`);
      this.setTrendCollection(data.data);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  beforeMount() {
    this.selectedFile = this.props.item.image;
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
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 190) || "Name be less than 190 characters"
    ],
    image: null,
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v => (v && v.length <= 190) || "Description be less than 190 characters"
    ],
    release_date: "",
    // releaseDateRules: [v => !!v || "Release Date is required"],
    datetime: null,
    selectedFile: null
  }),
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>