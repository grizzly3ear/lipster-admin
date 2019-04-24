<template>
  <div>
    <div class="body-content">
    <v-toolbar card prominent id="tool-container">
      <div id="search-container">
        <SearchBrand/>
      </div>
      <div id="operation-container">
        <OperationBrand/>
      </div>
    </v-toolbar>
    <hr>
    <div class="title">
      <p>List Lipstick Color</p>
    </div>
      <ColorList/>
    </div>
  </div>
</template>

<script>
import SearchBrand from "../components/SearchBrand";
import OperationBrand from "../components/OperationBrand";
import ColorList from "../components/ColorList";

export default {
  components: {
    SearchBrand,
    OperationBrand,
    ColorList
  }
};
</script>
