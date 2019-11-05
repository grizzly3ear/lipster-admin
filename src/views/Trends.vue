<template>
  <div>
    <v-toolbar card prominent id="tool-container">
      <div id="search-container">
        <!-- <SearchTrend /> -->
      </div>
      <div id="operation-container">
        <OperationTrend />
      </div>
    </v-toolbar>
    <v-breadcrumbs :items="getBreadcrumbs" divider=">"></v-breadcrumbs>
    <div class="title">
      <p>Trend</p>
    </div>
    <TrendList />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TrendList from "../components/TrendList";
// import SearchTrend from "../components/SearchTrend";
import OperationTrend from "../components/OperationTrend";

// import ToolBar from '../components/ToolBar'

export default {
  components: {
    TrendList,
    // SearchTrend,
    OperationTrend
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