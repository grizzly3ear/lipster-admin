<template>
  <v-layout>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for="store in getStore" :key="store.id">
          <StoreCard :store="store" />
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import StoreCard from "@/components/StoreCard";
import axios from "../utils/axios.js";

export default {
  name: "storeList",
  components: {
    StoreCard
  },
  methods: {
    ...mapActions(["setStore"]),
    async getStores() {
      const { data } = await axios.get(`api/store`);
      this.setStore(data.data);
    }
  },
  async mounted() {
    this.getStores();
  },
  data() {
    return {
      info: [],
      stores: []
    };
  },
  computed: {
    ...mapGetters(["getStore"])
  }
};
</script>