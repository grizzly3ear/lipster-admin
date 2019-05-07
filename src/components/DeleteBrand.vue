<template>
  <v-layout class='operation-icon'>
    <v-btn  icon @click='onDeleteClick'>
      <v-img :src='require("@/assets/bin.png")'/>
    </v-btn>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";

  export default {
    methods: {
        onDeleteClick () {
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
                axios.delete(`http://18.136.104.217/api/lipstick/brand/` + this.brand.id)
                Swal.fire(
                    'Deleted!',
                    'This item has been deleted.',
                    'success'
                )
                }
            }) 
        },
    },
    props: [
        'brand'
        ],
    data () {
      return {
        
      }
    }
  }
</script>
