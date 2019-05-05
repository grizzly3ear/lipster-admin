<template>
  <v-toolbar id='tool-bar'>

    <v-spacer></v-spacer>
    
    
    <!-- <EditDetail/> -->
    <AddDetail/>
    <ConfirmDelete/>

  </v-toolbar>
</template>

<script>
import AddDetail from '../components/AddDetail'
// import EditDetail from '../components/EditDetail'
import ConfirmDelete from '../components/ConfirmDelete'

export default {
  components: {
    AddDetail,
    // EditDetail,
    ConfirmDelete
  }
}
</script>







