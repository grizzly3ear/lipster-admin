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
          <span class="headline">Add Trend</span>
        </v-card-title>
        <v-card-text>
          <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="title"
                  label="Title*"
                  :rules="titleRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="skin_color"
                  label="Skin color*"
                  prefix="#"
                  :rules="skinColorRules"
                  :counter="6"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="lipstick_color"
                  label="Lipstick color*"
                  prefix="#"
                  :rules="lipstickColorRules"
                  :counter="6"
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
                <input ref="files" type="file" @change="onFileSelected" required accept="image/*" />
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
    ...mapActions(["setTrend"]),
    async onAddClick() {
      let formData = new FormData();
      let imageToBase64 = await this.encodeToBase64(this.$refs.files.files);
      formData.append("title", this.title);
      formData.append("image", imageToBase64);
      formData.append("skin_color", "#" + this.skin_color);
      formData.append("description", this.description);
      formData.append("lipstick_color", "#" + this.lipstick_color);
      formData.append("trend_group_id", this.$route.params.id);
      await axios.post(`api/trend`, formData, {
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
        `api/trend/collection/${this.$route.params.id}` + `?part=trend`
      );
      this.setTrend(data.data.trends);
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
    title: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 190) || "Title be less than 190 characters"
    ],
    image: null,
    lipstick_color: null,
    lipstickColorRules: [
      v => !!v || "Lipstick color is required",
      v => (v && v.length == 6) || "Lipstick color must be 6 characters"
    ],
    skin_color: "",
    skinColorRules: [
      v => !!v || "Skin color is required",
      v => (v && v.length == 6) || "Skin color must be 6 characters"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v => (v && v.length <= 190) || "Description be less than 190 characters"
    ],
    selectedFile: null
  }),
  computed: {
    ...mapGetters(["getTrend"])
  }
};
</script>