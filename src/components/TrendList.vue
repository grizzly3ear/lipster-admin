<template>
  <v-data-table
    id="table-list"
    :headers="headers"
    :items="getTrend"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <!-- <td>
        <SelectTrendCard :props="props" />
      </td>-->
      <td>{{ props.item.title }}</td>
      <td>
        <img class="image-container" :src="props.item.image" />
      </td>
      <td>
        <div v-html="renderSkinColorBox(props.item.skin_color)"></div>
        {{ props.item.skin_color }}
      </td>
      <td>
        <div v-html="renderColorBox(props.item.lipstick_color)"></div>
        {{ props.item.lipstick_color }}
      </td>
      <td>
        {{ props.item.description }}
        <br />
        <label class="created-at-table">Created: {{getDate(props.item.created_at)}}</label>
        {{" "}}{{" "}}
        <label
          class="created-at-table"
        >Updated: {{getDate(props.item.updated_at)}}</label>
      </td>
      <td>
        <EditTrend :props="props" />
      </td>
      <td>
        <DeleteTrend :props="props" />
      </td>
    </template>
  </v-data-table>
</template>

<script>
import EditTrend from "../components/EditTrend";
import DeleteTrend from "../components/DeleteTrend";
// import SelectTrendCard from "../components/SelectTrendCard";
import axios from "../utils/axios.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditTrend,
    DeleteTrend
    // SelectTrendCard
  },
  methods: {
    ...mapActions(["setTrend"]),
    async getTrends() {
      const { data } = await axios.get(
        `api/trend/collection/${this.$route.params.id}?part=trend`
      );
      this.trends = data.data.trends;
      this.setTrend(data.data.trends);
    },
    renderSkinColorBox(rgb) {
      return `<div class='color-box' style="background-color: ${rgb}"></div>`;
    },
    renderColorBox(rgb) {
      return `<div class='color-box' style="background-color: ${rgb}"></div>`;
    },
    getDate(date) {
      return date.substring(0, 10);
    }
  },
  async mounted() {
    this.getTrends();
  },
  data() {
    return {
      selected: [],
      trends: {},
      props: {},
      headers: [
        { text: "Title", value: "title" },
        { text: "Image", value: "image" },
        { text: "Skin color", value: "skin_color" },
        { text: "Lipstick color", value: "lipstick_color_id" },
        { text: "Description", value: "Description" },
        { text: "Edit" },
        { text: "Delete" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getTrend"])
  }
};
</script>


