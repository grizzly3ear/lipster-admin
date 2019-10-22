<template>
  <v-data-table
    id="table-list"
    :headers="headers"
    :items="getTrendCollection"
    item-key="getTrendCollection.id"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td></td>
      <router-link :to="{ name: 'Trend', params: {id: props.item.id}}">
        <td
          style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
        >{{ props.item.name }}</td>
      </router-link>
      <td>
        <img class="image-container" :src="props.item.image" />
      </td>
      <td>{{ props.item.description }}</td>
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
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditTrendCollection,
    DeleteTrendCollection
  },
  methods: {
    ...mapActions(["setTrendCollection"]),
    async getTrendCollections() {
      const { data } = await axios.get(
        `http://18.136.104.217/api/trend/collection`
      );
      this.setTrendCollection(data.data);
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
        { text: "", value: "" },
        { text: "Name", value: "name" },
        { text: "Image", value: "image" },
        { text: "Description", value: "Description" },
        { text: "Edit" },
        { text: "Delete" },
        { text: "" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>







