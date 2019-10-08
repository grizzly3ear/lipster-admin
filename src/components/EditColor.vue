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
          <span class="headline">Edit Lipstick Color</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.color_name" label="Color Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.rgb" label="RGB*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.color_code" label="Color Code*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.composition" label="Composition" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <input ref="files" type="file" @change="onFileSelected" accept="image/*" />
                <div class="image-preview">
                  <v-list v-for="image in selectedFile" :key="image.id">
                    <img class="preview" :src="image.image" />
                  </v-list>
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
    async onEditClick() {
      await axios.put(
        `http://18.136.104.217/api/lipstick/color/` + this.props.item.id,
        {
          color_name: this.props.item.color_name,
          rgb: this.props.item.rgb,
          color_code: this.props.item.color_code,
          composition: this.props.item.composition,
          lipstick_detail_id: this.$route.params.id
        }
      );
      //TODO: loop images
      let imageToBase64 = await this.encodeToBase64(this.$refs.files.files);
      await axios.put(
        `http://18.136.104.217/api/lipstick/image/` +
          this.props.item.images[0].id,
        {
          image: imageToBase64,
          lipstick_color_id: this.props.item.id
        }
      );

      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });
      const { data } = await axios.get(
        `http://18.136.104.217/api/lipstick/detail/` +
          this.$route.params.id +
          `?part=color`
      );
      this.setColor(data);
    }
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    color_name: "",
    rgb: "",
    color_code: "",
    image: "",
    composition: "",
    selectedFile: null
  }),
  beforeMount() {
    this.selectedFile = this.props.item.images;
  },
  computed: {
    ...mapGetters(["getColor"])
  }
};
</script>
