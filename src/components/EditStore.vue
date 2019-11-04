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
          <span class="headline">Edit Store</span>
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
    ...mapActions(["setStore"]),
    async onEditClick() {
      let image = null;
      try {
        image = await this.encodeToBase64(this.$refs.files.files);
      } catch (e) {
        console.error(e);
        image = null;
      }

      await axios.put(`api/store/` + this.store.id, {
        name: this.name,
        image: image
      });
      this.dialog = false;
      Swal.fire({
        position: "center",
        type: "success",
        title: "This store has been updated",
        showConfirmButton: false,
        timer: 500
      });
      const { data } = await axios.get(`api/store?part=address`);
      this.setStore(data.data);
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
  props: ["store"],
  data: () => ({
    dialog: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name be less than 30 characters"
    ],
    image: "",
    selectedFile: null
  }),
  beforeMount() {
    this.selectedFile = this.store.image;
    this.name = this.store.name;
  },
  computed: {
    ...mapGetters(["getStore"])
  }
};
</script>
