<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-img :src="require('../assets/edit.png')"/>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Lipstick Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="['Tint', 'Matte', 'Balm']" label="Type*" required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Max Price*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Min Price*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Opacity*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Description*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Composition*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Apply*" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style="margin: 0 187px 0 187px">
          <v-btn color="blue darken-1"  @click="dialog = false">Close</v-btn>
          <div @click="dialog = false" style="margin: 30px"><v-btn color="blue darken-1"  @click="onEditClick">Save</v-btn></div>
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
};
</script>
