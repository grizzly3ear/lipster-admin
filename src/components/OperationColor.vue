<template>
  <v-toolbar id="tool-bar">
    <v-spacer></v-spacer>

    <!-- <EditColor/> -->
    <AddColor />
    <!-- <ConfirmDelete/> -->
  </v-toolbar>
</template>

<script>
import AddColor from "../components/AddColor";
// import EditColor from '../components/EditColor'
// import ConfirmDelete from '../components/ConfirmDelete'

export default {
  components: {
    AddColor
    // EditColor,
    // ConfirmDelete
  }
};
</script>







