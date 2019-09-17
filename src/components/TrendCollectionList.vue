<template>
  <v-layout>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for="trendCollection in getTrendCollection" :key="trendCollection.id">
          <TrendCollectionCard :trendCollection="trendCollection" />
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import TrendCollectionCard from "@/components/TrendCollectionCard";
import axios from "../utils/axios.js";

export default {
  name: "trendCollectionList",
  components: {
    TrendCollectionCard
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
      info: [],
      trendCollections: []
    };
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>







