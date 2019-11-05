<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <!-- <SearchTrend /> -->
        </div>
        <div id="operation-container">
          <OperationTrendCollection />
        </div>
      </v-toolbar>
      <hr />
      <div class="title">
        <p>TREND COLLECTIONS</p>
      </div>
      <TrendCollectionList />
    </div>
  </div>
</template>

<script>
// import SearchTrend from "@/components/SearchTrend";
import OperationTrendCollection from "@/components/OperationTrendCollection";
import TrendCollectionList from "@/components/TrendCollectionList";

export default {
  components: {
    // SearchTrend,
    OperationTrendCollection,
    TrendCollectionList
  }
};
</script>
