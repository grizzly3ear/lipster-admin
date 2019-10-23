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
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="title" label="Title*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="skin_color" label="Skin color*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="description" label="Description*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="lipstick_color" label="Lipstick color*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <input ref="files" type="file" @change="onFileSelected" accept="image/*" />
                <div class="image-preview">
                  <img class="preview" :src="selectedFile" />
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
          <div @click="dialog = false" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onAddClick">Save</v-btn>
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
      formData.append("skin_color", this.skin_color);
      formData.append("description", this.description);
      formData.append("lipstick_color", this.lipstick_color);
      formData.append("trend_group_id", this.$route.params.id);
      await axios.post(`api/trend`, formData, {
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
        `api/trend/collection/${this.$route.params.id}` +
          `?part=trend`
      );
      this.setTrend(data.data.trends);
    }
  },
  data: () => ({
    dialog: false,
    title: "",
    image: null,
    lipstick_color: null,
    skin_color: "",
    description: "",
    selectedFile: null
  }),
  computed: {
    ...mapGetters(["getTrend"])
  }
};
</script>