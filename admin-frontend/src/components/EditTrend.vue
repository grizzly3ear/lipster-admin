<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-img :src="require('../assets/pen-blue.png')"/>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Trend</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title*" required>Hot Summer Lipstick</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Year*" required>2019</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Image*" required>summer.png</v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Lipstick color ID*" required>1</v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1"  @click="dialog = false">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>