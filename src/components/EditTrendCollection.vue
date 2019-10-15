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
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="trendCollection.name" label="Name*" required></v-text-field>
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
          <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
          <div @click="dialog = false" style="margin: 30px">
            <v-btn color="blue darken-1" @click="onEditClick">Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

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
      let imageToBase64 = await this.encodeToBase64(this.$refs.files.files);

      await axios.put(
        `http://18.136.104.217/api/trend/collection/` + this.trendCollection.id,
        {
          name: this.trendCollection.name,
          image: imageToBase64
        }
      );
      Swal.fire({
        position: "center",
        type: "success",
        title: "This brand has been updated",
        showConfirmButton: false,
        timer: 1000
      });
      const { data } = await axios.get(
        `http://18.136.104.217/api/trend/collection`
      );
      this.setTrendCollection(data.data);
    }
  },
  props: ["trendCollection"],
  data: () => ({
    dialog: false,
    name: "",
    image: "",
    selectedFile: null
  }),
  beforeMount() {
    this.selectedFile = this.trendCollection.image;
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>
