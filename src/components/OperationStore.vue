<template>
  <v-toolbar id='tool-bar'>

    <v-spacer></v-spacer>
    
    
    <!-- <EditLipstick/> -->
    <AddBrand/>
    <ConfirmDelete/>

  </v-toolbar>
</template>

<script>
import AddBrand from '../components/AddBrand'
// import EditLipstick from '../components/EditLipstick'
import ConfirmDelete from '../components/ConfirmDelete'

export default {
  components: {
    AddBrand,
    // EditLipstick,
    ConfirmDelete
  }
}
</script>







