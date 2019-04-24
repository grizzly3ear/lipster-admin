<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-img :src="require('../assets/add.png')"/>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Lipstick</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Brand*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
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
              <v-flex xs12 sm6 md4>
                <v-text-field label="Color Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="RGB*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Color Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Image*" required></v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex> -->
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1"  @click="dialog = false">Save</v-btn>
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