<template>
  <v-layout>
    <v-dialog v-model='dialog' persistent max-width='600px'>
      <template v-slot:activator='{ on }'>
        <v-btn icon v-on='on'>
          <v-icon color="black">edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class='headline'>Edit Brand</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='name' label='Name*' required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style='margin: 0 187px 0 187px'>
          <v-btn color='blue darken-1'  @click='dialog = false'>Close</v-btn>
          <div @click='dialog = false' style='margin: 30px'><v-btn color='blue darken-1'  @click='onEditClick'>Save</v-btn></div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'setBrand'
    ]),
    async onEditClick(){
      await axios.put(`http://18.136.104.217/api/brand/` + this.brand.id,
      {
      name: this.name 
      })
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'This brand has been updated',
        showConfirmButton: false,
        timer: 1000
      })
      const { data } = await axios.get(`http://18.136.104.217/api/lipstick`)
      this.setBrand(data)
    },
  },
  props: [
    'brand'
  ],
  data: () => ({
    dialog: false,
    name: ''
  }),
  computed: {
    ...mapGetters([
      'getBrand'
    ])
  }
}
</script>
