<template>
  <v-layout>
    <v-dialog v-model='dialog' persistent max-width='600px'>
      <template v-slot:activator='{ on }'>
        <v-btn icon v-on='on'>
          <v-icon color="black">add_box</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class='headline'>Add Lipstick Brand</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='name' label='Brand*' required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style='margin: 0 187px 0 187px'>
          <v-btn color='blue darken-1' @click='dialog = false'>Close</v-btn>
          <div @click='dialog = false' style='margin: 30px'>
            <v-btn color='blue darken-1' @click='onAddClick'>Save</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
import axios from "axios";

export default {
  methods: {
    ...mapActions([
      'setBrand'
    ]),
    async onAddClick() {
      let formData = new FormData()
      formData.append('name', this.name)
      await axios.post(`http://18.136.104.217/api/brand`, 
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.$forceUpdate();
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      })
      const { data } = await axios.get(`http://18.136.104.217/api/lipstick`)
      this.setBrand(data)
    }
  },
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