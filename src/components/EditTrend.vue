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
          <span class='headline'>Edit Trend</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='title' label='Title*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='year' label='Year*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='image' label='Image*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='skin_color' label='Skin color*' required></v-text-field>
              </v-flex>
               <v-flex xs12>
                <v-text-field v-model='description' label='Description*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='lipstick_color_id' label='Lipstick color ID*' required></v-text-field>
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
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'setTrend'
    ]),
    async onEditClick(){
        await axios.put(`http://18.136.104.217/api/trend/` + this.props.item.id,
        {
        title: this.title,
        year: this.year,
        image: this.image,
        skin_color: this.skin_color,
        description: this.description,
        lipstick_color_id: this.lipstick_color_id,
        })
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          const { data } = await axios.get(`http://18.136.104.217/api/trend`)
          this.setTrend(data)
      },
  },
  props: [
    'props'
  ],
  data: () => ({
    dialog: false,
    title: '',
    year: null,
    image: '',
    skin_color: '',
    description: '',
    lipstick_color_id: null
  }),
  computed: {
    ...mapGetters([
      'getTrend'
    ])
  }
}
</script>