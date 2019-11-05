<template>
  <v-toolbar id='tool-bar'>

    <v-spacer></v-spacer>
    
    
    <!-- <EditBrand/> -->
    
    <AddBrand/>
    <!-- <ConfirmDelete/> -->

  </v-toolbar>
</template>

<script>
import AddBrand from '../components/AddBrand'
// import EditBrand from '../components/EditBrand'
// import ConfirmDelete from '../components/ConfirmDelete'

export default {
  components: {
    AddBrand,
    // EditBrand,
    // ConfirmDelete
  }
}
</script>







