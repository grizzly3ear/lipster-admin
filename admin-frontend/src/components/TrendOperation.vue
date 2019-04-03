<template>
  <v-toolbar id="tool-bar">

    <v-spacer></v-spacer>
    
    
    <EditTrend/>
    <ConfirmDelete/>
    <AddTrend/>

  </v-toolbar>
</template>

<script>
import AddTrend from "../components/AddTrend";
import EditTrend from "../components/EditTrend";
import ConfirmDelete from "../components/ConfirmDelete";

export default {
  components: {
    AddTrend,
    EditTrend,
    ConfirmDelete
  }
};
</script>







