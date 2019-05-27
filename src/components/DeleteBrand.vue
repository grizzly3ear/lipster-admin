<template>
  <v-layout class='operation-icon'>
    <v-btn icon @click='onDeleteClick'>
      <v-icon color="black">delete</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../utils/axios'
import { mapActions, mapGetters } from 'vuex'
  
export default {
  methods: {
    ...mapActions([
      'setBrand'
    ]),
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
            axios.delete(`brand/${this.brand.id}`).then( result => {
              Swal.fire(
                'Deleted!',
                'This item has been deleted.',
                'success'
              )
            }).catch( error => {
              Swal.fire(
                'Deleted!',
                'This item has been failed to deleted.',
                'warning'
              )
            }).finally(() => {
              axios.get(`brand`).then(({data}) => {
                console.log(data)
                this.setBrand(data)
              })
            })
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
    },
    computed: {
      ...mapGetters([
        'getBrand'
      ])
    }
  }
</script>
