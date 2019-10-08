<template>
  <div>
    <div class="body-content">
      <v-toolbar card prominent id="tool-container">
        <div id="search-container">
          <SearchBrand />
        </div>
        <div id="operation-container">
          <OperationBrand />
        </div>
      </v-toolbar>
      <hr />
      <div class="title">
        <p>List Brand</p>
      </div>
      <BrandList />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchBrand from "@/components/SearchBrand";
import OperationBrand from "@/components/OperationBrand";
import BrandList from "@/components/BrandList";

export default {
  components: {
    SearchBrand,
    OperationBrand,
    BrandList
  },
  methods: {
    ...mapActions(["setBreadcrumbs"])
  },
  mounted() {
    this.setBreadcrumbs([]);
  }
};
</script>
