<template>
  <v-toolbar id="tool-bar">
    <v-spacer></v-spacer>

    <AddTrendCollection />
    <!-- <ConfirmDelete /> -->
  </v-toolbar>
</template>

<script>
import AddTrendCollection from "../components/AddTrendCollection";
// import ConfirmDelete from "../components/ConfirmDelete";

export default {
  components: {
    AddTrendCollection
    // ConfirmDelete
  }
};
</script>