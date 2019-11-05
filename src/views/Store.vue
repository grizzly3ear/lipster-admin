<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <!-- <SearchStore /> -->
        </div>
        <div id="operation-container">
          <OperationStore />
        </div>
      </v-toolbar>
      <hr />
      <div class="title">
        <p>List Store</p>
      </div>
      <StoreList />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import SearchStore from "../components/SearchStore";
import OperationStore from "../components/OperationStore";
import StoreList from "../components/StoreList";

export default {
  components: {
    // SearchStore,
    OperationStore,
    StoreList
  },
  methods: {
    ...mapActions(["setBreadcrumbs"])
  },
  mounted() {
    this.setBreadcrumbs([]);
  }
};
</script>
