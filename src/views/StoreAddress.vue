<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <SearchDetail />
        </div>
        <div id="operation-container">
          <OperationStoreAddress />
        </div>
      </v-toolbar>
      <hr />
      <v-breadcrumbs :items="getBreadcrumbs" divider=">"></v-breadcrumbs>
      <div class="title">
        <p>List Store Address</p>
      </div>
      <StoreAddressList />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchDetail from "../components/SearchDetail";
import OperationStoreAddress from "../components/OperationStoreAddress";
import StoreAddressList from "../components/StoreAddressList";

export default {
  components: {
    SearchDetail,
    OperationStoreAddress,
    StoreAddressList
  },
  computed: {
    ...mapGetters(["getBreadcrumbs"])
  }
};
</script>