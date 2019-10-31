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
          <span class="headline">Add Lipstick Color</span>
        </v-card-title>
        <v-card-text>
          <v-form grid-list-md ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="color_name"
                  label="Color Name*"
                  :rules="colorNameRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="rgb"
                  prefix="#"
                  label="RGB*"
                  :rules="rgbRules"
                  :counter="6"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="color_code"
                  label="Color Code*"
                  :rules="colorCodeRules"
                  :counter="30"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="composition"
                  label="Composition*"
                  :rules="compositionRules"
                  :counter="190"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <input ref="files" type="file" @change="onFileSelected" accept="image/*" />
                <div class="image-preview">
                  <img class="preview" :src="selectedFile" />
                </div>
              </v-flex>
            </v-layout>
          </v-form>
          <small>*Image is required</small>
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
    ...mapActions(["setColor"]),
    async onAddClick() {
      let formData = new FormData();
      formData.append("color_name", this.color_name);
      formData.append("rgb", "#" + this.rgb);
      formData.append("color_code", this.color_code);
      formData.append("composition", this.composition);
      formData.append("lipstick_detail_id", this.$route.params.id);
      let newColor = await axios.post(`api/lipstick/color`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      let formImage = new FormData();
      let imageToBase64 = await this.encodeToBase64(this.$refs.files.files);
      formImage.append("image", imageToBase64);
      formImage.append("lipstick_color_id", newColor.data.id);
      await axios.post(`api/lipstick/image`, formImage, {
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
        `api/lipstick/detail/${this.$route.params.id}?part=color`
      );
      this.setColor(data);
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
    color_name: "",
    colorNameRules: [
      v => !!v || "Color name is required",
      v => (v && v.length <= 30) || "Color name be less than 30 characters"
    ],
    rgb: "",
    rgbRules: [
      v => !!v || "RGB is required",
      v => (v && v.length == 6) || "Rgb must be 6 characters"
    ],
    color_code: "",
    colorCodeRules: [
      v => !!v || "Color code is required",
      v => (v && v.length <= 30) || "Color code be less than 30 characters"
    ],
    composition: "",
    compositionRules: [
      v => !!v || "Composition is required",
      v => (v && v.length <= 190) || "Composition be less than 190 characters"
    ],
    image: "",
    selectedFile: null
  }),
  computed: {
    ...mapGetters(["getColor"])
  }
};
</script>