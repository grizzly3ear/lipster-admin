<template>
  <v-layout>
    <v-dialog v-model='dialog' persistent max-width='600px'>
      <template v-slot:activator='{ on }'>
        <v-btn icon v-on='on'>
          <v-img :src='require("@/assets/edit.png")'/>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class='headline'>Edit Trend</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label='Title*' required>Hot Summer Lipstick</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label='Year*' required>2019</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label='Image*' required>summer.png</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label='Lipstick color ID*' required>1</v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style='margin: 0 187px 0 187px'>
          <v-spacer></v-spacer>
          <v-btn color='blue darken-1' @click='dialog = false'>Close</v-btn>
          <div  @click='dialog = false' style='margin: 30px'><v-btn color='blue darken-1' @click='onEditClick'>Edit</v-btn></div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  methods: {
      onEditClick: function (e) {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000
        })
      }
    },
  data: () => ({
    dialog: false
  })
}
</script>