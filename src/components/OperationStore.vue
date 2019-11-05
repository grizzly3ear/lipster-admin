<template>
  <v-toolbar id="tool-bar">
    <v-spacer></v-spacer>

    <!-- <EditLipstick/> -->
    <AddStore />
    <!-- <ConfirmDelete /> -->
  </v-toolbar>
</template>

<script>
import AddStore from "../components/AddStore";
// import EditLipstick from '../components/EditLipstick'
// import ConfirmDelete from "../components/ConfirmDelete";

export default {
  components: {
    AddStore
    // EditLipstick,
    // ConfirmDelete
  }
};
</script>







