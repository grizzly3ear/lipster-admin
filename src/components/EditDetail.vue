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
          <span class='headline'>Edit Lipstick Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model='name' label='Name*' required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items='["Tint", "Matte", "Balm"]' v-model='type' label='Type*' required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model='max_price' label='Max Price*' required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model='min_price' label='Min Price*' required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model='opacity' label='Opacity*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='description' label='Description*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='composition' label='Composition*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='apply' label='Apply*' required></v-text-field>
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
import { mapGetters, mapActions } from 'vuex';


export default {
     methods: {
       ...mapActions([
         'setDetail'
       ]),
    async onEditClick(){
        await axios.put(`http://18.136.104.217/api/lipstick/detail/` + this.props.item.id,
        {
        name: this.name,
        max_price: this.max_price,
        min_price: this.min_price,
        type: this.type,
        opacity: this.opacity,
        description: this.description,
        composition: this.composition, 
        apply: this.apply, 
        lipstick_brand_id: this.props.item.lipstick_brand_id
        })
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          const { data } = await axios.get(`http://18.136.104.217/api/brand/` + this.$route.params.id)
          this.setDetail(data)
      },
  },
  props: [
    'props'
  ],
  data: () => ({
    dialog: false,
    name: '',
    max_price: null,
    min_price: null,
    type: '',
    opacity: null,
    description: '',
    composition: '',
    apply: '',
    lipstick_brand_id: null
  }),
  computed: {
    ...mapGetters([
      'getDetail'
    ])
  }
  
}
</script>
