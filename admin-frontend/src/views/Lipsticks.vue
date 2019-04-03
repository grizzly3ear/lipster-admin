<template>
  <div>
    <v-toolbar card prominent id="tool-container">
      <div id="search-container">
        <Search/>
      </div>
      <div id="operation-container">
        <Operation/>
      </div>
    </v-toolbar>
    <LipstickList/>
  </div>
</template>

<script>
import LipstickList from "../components/LipstickList";
import Search from "../components/Search";
import Operation from "../components/Operation";

export default {
  components: {
    LipstickList,
    Search,
    Operation
  }
};
</script>
