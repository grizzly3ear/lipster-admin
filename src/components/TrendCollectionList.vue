<template>
  <v-data-table
    id="table-list"
    :headers="headers"
    :items="getTrendCollection"
    item-key="getTrendCollection.id"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <router-link :to="{ name: 'Trend', params: {id: props.item.id}}">
        <td
          style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
        >
          {{ props.item.name }}
          <br />
          <v-icon class="num-trend" color="gray">face</v-icon>
          <label
            class="num-trend"
            v-text="(props.item.trends || []).length"
            style="font-size: 14px; color: gray;"
          ></label>
          <label class="num-trend" style="font-size: 14px; color: gray;">{{" "}}trends</label>
          <br />
          <label class="created-at-table">Created: {{getDate(props.item.created_at)}}</label>
          <br />
          <label class="created-at-table">Updated: {{getDate(props.item.updated_at)}}</label>
        </td>
      </router-link>
      <td>
        <img class="image-container" :src="props.item.image" />
      </td>
      <td>{{ props.item.description }}</td>
      <td>{{ props.item.release_date }}</td>
      <td>
        <EditTrendCollection :props="props" />
      </td>
      <td>
        <DeleteTrendCollection :props="props" />
      </td>
      <td></td>
    </template>
  </v-data-table>
</template>

<script>
import EditTrendCollection from "../components/EditTrendCollection";
import DeleteTrendCollection from "../components/DeleteTrendCollection";
import axios from "../utils/axios.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditTrendCollection,
    DeleteTrendCollection
  },
  methods: {
    ...mapActions(["setTrendCollection"]),
    async getTrendCollections() {
      const { data } = await axios.get(`api/trend/collection?part=trend`);
      this.setTrendCollection(data.data);

      // Split timestamp into [ Y, M, D, h, m, s ]
      var t = "2010-06-09 13:12:01".split(/[- :]/);

      // Apply each element to the Date function
      var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

      console.log(d);
      // -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
    },
    getDate(date) {
      return date.substring(0, 10);
    }
  },
  async mounted() {
    this.getTrendCollections();
  },
  data() {
    return {
      selected: [],
      props: {},
      headers: [
        { text: "Name", value: "name" },
        { text: "Image", value: "image" },
        { text: "Description", value: "description" },
        { text: "Release Date", value: "release_date" },
        { text: "Edit" },
        { text: "Delete" },
        { text: "" }
      ],
      create_at: null,
      update_at: null
    };
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>







