<template>
  <div>
    <v-toolbar card prominent id="tool-container">
      <div id="search-container">
        <!-- <Search/> -->
      </div>
      <div id="operation-container">
        <TrendOperation/>
      </div>
    </v-toolbar>
    <TrendList/>
  </div>
</template>

<script>
import TrendList from "../components/TrendList";
// import Search from "../components/Search";
import TrendOperation from "../components/TrendOperation";

// import ToolBar from "../components/ToolBar";

export default {
  components: {
    TrendList,
    // Search,
    TrendOperation
  }
};
</script>