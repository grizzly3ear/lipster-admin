<template>
  <div>
    <v-toolbar card prominent id="tool-container">
      <div id="search-container">
        <SearchTrend/>
      </div>
      <div id="operation-container">
        <OperationTrend/>
      </div>
    </v-toolbar>
    <TrendList/>
  </div>
</template>

<script>
import TrendList from "../components/TrendList";
import SearchTrend from "../components/SearchTrend";
import OperationTrend from "../components/OperationTrend";

// import ToolBar from "../components/ToolBar";

export default {
  components: {
    TrendList,
    SearchTrend,
    OperationTrend
  }
};
</script>