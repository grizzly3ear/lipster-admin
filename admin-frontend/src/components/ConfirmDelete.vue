<template>
  <v-layout class="operation-icon">
    <v-btn icon @click.stop="dialog = true">
      <v-img :src="require('../assets/bin-red.png')" />
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>
          Do you really to delete these records? This process cannot be undone!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            @click="dialog = false"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>
