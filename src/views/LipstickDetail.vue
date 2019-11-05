<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <!-- <SearchDetail /> -->
        </div>
        <div id="operation-container">
          <OperationDetail />
        </div>
      </v-toolbar>
      <hr />
      <v-breadcrumbs :items="getBreadcrumbs" divider=">"></v-breadcrumbs>
      <div class="title">
        <p>List Lipstick Detail</p>
      </div>
      <DetailList />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import SearchDetail from "../components/SearchDetail";
import OperationDetail from "../components/OperationDetail";
import DetailList from "../components/DetailList";

export default {
  components: {
    // SearchDetail,
    OperationDetail,
    DetailList
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