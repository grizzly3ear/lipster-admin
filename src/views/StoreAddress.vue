<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <!-- <SearchDetail /> -->
        </div>
        <div id="operation-container">
          <OperationStoreAddress />
        </div>
      </v-toolbar>
      <hr />
      <div class="title">
        <p>BRANCHES</p>
      </div>
      <v-breadcrumbs :items="getBreadcrumbs" divider=">"></v-breadcrumbs>
      <StoreAddressList />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import SearchDetail from "../components/SearchDetail";
import OperationStoreAddress from "../components/OperationStoreAddress";
import StoreAddressList from "../components/StoreAddressList";

export default {
  components: {
    // SearchDetail,
    OperationStoreAddress,
    StoreAddressList
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