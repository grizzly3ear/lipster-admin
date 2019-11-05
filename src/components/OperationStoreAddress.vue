<template>
  <v-toolbar id="tool-bar">
    <v-spacer></v-spacer>

    <AddStoreAddress />
    <!-- <ConfirmDelete /> -->
  </v-toolbar>
</template>

<script>
import AddStoreAddress from "../components/AddStoreAddress";
// import EditDetail from '../components/EditDetail'
// import ConfirmDelete from "../components/ConfirmDelete";

export default {
  components: {
    AddStoreAddress
    // EditDetail,
    // ConfirmDelete
  }
};
</script>







