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
          <span class="headline">Edit Trend</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="props.item.title" label="Title*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.skin_color" label="Skin color*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.description" label="Description*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.lipstick_color" label="Lipstick color*" required></v-text-field>
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
            <v-btn color="blue darken-1" @click="onEditClick">Edit</v-btn>
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
    ...mapActions(["setTrend"]),
    async onEditClick() {
      let imageToBase64 = await this.encodeToBase64(this.$refs.files.files);
      await axios.put(`http://18.136.104.217/api/trend/` + this.props.item.id, {
        title: this.props.item.title,
        image: imageToBase64,
        skin_color: this.props.item.skin_color,
        description: this.props.item.description,
        lipstick_color: this.props.item.lipstick_color,
        trend_group_id: this.$route.params.id
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
        `http://18.136.104.217/api/trend/collection/${this.$route.params.id}` +
          `?part=trend`
      );
      this.setTrend(data.data.trends);
    }
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    title: "",
    image: null,
    skin_color: "",
    description: "",
    lipstick_color: null,
    selectedFile: null
  }),
  beforeMount() {
    this.selectedFile = this.props.item.image;
  },
  computed: {
    ...mapGetters(["getTrend"])
  }
};
</script>