<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <!-- <SearchDetail /> -->
        </div>
        <div id="operation-container">
          <OperationLipstickOfStoreAddress />
        </div>
      </v-toolbar>
      <hr />
      <v-breadcrumbs :items="getBreadcrumbs" divider=">"></v-breadcrumbs>
      <div class="title">
        <p>List Lipsticks</p>
      </div>
      <LipstickOfStoreAddressList />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import SearchDetail from "../components/SearchDetail";
import OperationLipstickOfStoreAddress from "../components/OperationLipstickOfStoreAddress";
import LipstickOfStoreAddressList from "../components/LipstickOfStoreAddressList";

export default {
  components: {
    // SearchDetail,
    OperationLipstickOfStoreAddress,
    LipstickOfStoreAddressList
  },
  computed: {
    ...mapGetters(["getBreadcrumbs"])
  },
  methods: {
    ...mapActions(["setBreadcrumbs"])
  },
  mounted() {
    this.setBreadcrumbs([]);
  }
};
</script>