<template>
  <v-layout class='operation-icon'>
    <v-btn  icon @click='onDeleteClick'>
      <v-icon color="black">delete</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'

  export default {
    methods: {
      onDeleteClick: function (e) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'This item has been deleted.',
            'success'
          )
        }
      })
      }
    },
    data () {
      return {
        
      }
    }
  }
</script>
