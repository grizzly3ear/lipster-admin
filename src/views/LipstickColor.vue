<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <!-- <SearchColor /> -->
        </div>
        <div id="operation-container">
          <OperationColor />
        </div>
      </v-toolbar>
      <hr />
      <v-breadcrumbs :items="getBreadcrumbs" divider=">"></v-breadcrumbs>
      <div class="title">
        <p>List Lipstick Color</p>
      </div>
      <ColorList />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import SearchColor from "../components/SearchColor";
import OperationColor from "../components/OperationColor";
import ColorList from "../components/ColorList";

export default {
  components: {
    // SearchColor,
    OperationColor,
    ColorList
  },
  computed: {
    ...mapGetters(["getBreadcrumbs"])
  }
};
</script>
