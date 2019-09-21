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
          <span class="headline">Edit Lipstick Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="props.item.name" label="Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-combobox
                  v-model="props.item.type"
                  :items="types.data"
                  label="Type*"
                  item-text="type"
                  return-object
                ></v-combobox>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.max_price" label="Max Price*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.min_price" label="Min Price*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="props.item.opacity" label="Opacity*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.description" label="Description*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="props.item.apply" label="Apply*" required></v-text-field>
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
    ...mapActions(["setDetail"]),
    async onEditClick() {
      await axios.put(
        `http://18.136.104.217/api/lipstick/detail/` + this.props.item.id,
        {
          name: this.props.item.name,
          max_price: this.props.item.max_price,
          min_price: this.props.item.min_price,
          type: this.props.item.type,
          opacity: this.props.item.opacity,
          description: this.props.item.description,
          apply: this.props.item.apply,
          lipstick_brand_id: this.$route.params.id
        }
      );
      this.$forceUpdate();
      Swal.fire({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1000
      });
      const { data } = await axios.get(
        `http://18.136.104.217/api/brand/` + this.$route.params.id + `/detail`
      );
      this.setDetail(data.data);
    },
    async getType() {
      const { data } = await axios.get(
        `http://18.136.104.217/api/lipstick/detail/type`
      );
      this.types = data;
    }
  },
  async mounted() {
    this.getType();
  },
  props: ["props"],
  data: () => ({
    dialog: false,
    name: "",
    max_price: null,
    min_price: null,
    type: "",
    opacity: null,
    description: "",
    apply: "",
    lipstick_brand_id: null,
    types: []
  }),
  computed: {
    ...mapGetters(["getDetail"])
  }
};
</script>
