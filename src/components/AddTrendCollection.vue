<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon color="black">add_box</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Trend Collection</span>
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
              <!-- <v-flex xs12>
                <v-text-field
                  v-model="release_date"
                  label="Release Date*"
                  :rules="releaseDateRules"
                  required
                ></v-text-field>
              </v-flex>-->
              <v-flex xs12>
                <input ref="files" type="file" @change="onFileSelected" accept="image/*" />
                <div class="image-preview">
                  <img class="preview" :src="selectedFile" />
                </div>
              </v-flex>
              <!-- <v-flex xs12>
                <h3>Example of Notification:</h3>
                <div
                  style="width: 400px; height: 92px; border: 1.5px solid #D5DBDB;  border-radius: 2px;"
                >
                  <div style="float: left; width: 70px; height: 70px; margin: 8px;">
                    <div class="image-preview">
                      <img style="width: 70px; height: 70px;" class="preview" :src="selectedFile" />
                    </div>
                  </div>
                  <div style="float: right; width: 295px; height: 70px; margin: 8px 8px 8px 0;">
                    <label style="font-weight: bold; font-size: 14px" v-text="name"></label>
                    <br />
                    <label style="font-size: 12px" v-text="description"></label>
                  </div>
                </div>
              </v-flex>-->
              <!-- <v-flex xs12>
                <v-checkbox
                  v-model="checkbox"
                  label="Do you want release this trend collection now?"
                  required
                ></v-checkbox>
              </v-flex>-->
            </v-layout>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
          <div @click="validate" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onAddClick" :disabled="!valid">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "../utils/axios.js";

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
    async onAddClick() {
      let formData = new FormData();
      let imageToBase64 = await this.encodeToBase64(this.$refs.files.files);

      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("release_date", this.release_date);
      formData.append("image", imageToBase64);
      // if (this.checkbox == true) {
      //   formData.append("release", true);
      //   console.log("true");
      // } else {
      //   formData.append("release", false);
      //   console.log("false");
      // }
      await axios.post(`api/trend/collection`, formData, {
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
      const { data } = await axios.get(`api/trend/collection?part=trend`);
      this.setTrendCollection(data.data);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  async mounted() {
    this.validate();
  },
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 190) || "Name be less than 190 characters"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v => (v && v.length <= 190) || "Description be less than 190 characters"
    ],
    release_date: null,
    // releaseDateRules: [v => !!v || "Release Date is required"],
    image: "",
    selectedFile: null,
    checkbox: false,
    release: false
  }),
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>