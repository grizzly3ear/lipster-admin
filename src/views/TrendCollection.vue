<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <!-- <div id="search-container">
          <SearchBrand />
        </div>-->
        <div id="operation-container">
          <OperationTrendCollection />
        </div>
      </v-toolbar>
      <hr />
      <div class="title">
        <p>Trend Collection</p>
      </div>
      <TrendCollectionList />
    </div>
  </div>
</template>

<script>
// import SearchBrand from "@/components/SearchBrand";
import OperationTrendCollection from "@/components/OperationTrendCollection";
import TrendCollectionList from "@/components/TrendCollectionList";

export default {
  components: {
    // SearchBrand,
    OperationTrendCollection,
    TrendCollectionList
  }
};
</script>
