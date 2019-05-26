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
          <span class='headline'>Add Lipstick Color</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model='color_name' label='Color Name*' required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model='rgb' label='RGB*' required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model='color_code' label='Color Name*' required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model='image' label='Image*' required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions style='margin: 0 187px 0 187px'>
          <v-btn color='blue darken-1'  @click='dialog = false'>Close</v-btn>
          <div @click='dialog = false' style='margin: 30px'><v-btn color='blue darken-1'  @click='onAddClick'>Save</v-btn></div>
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
      'setColor'
    ]),
    async onAddClick() {
      let formData = new FormData()
      formData.append('color_name', this.color_name)
      formData.append('rgb', this.rgb)
      formData.append('color_code', this.color_code)
      formData.append('lipstick_detail_id', this.$route.params.id)
      await axios.post(`http://18.136.104.217/api/lipstick`, 
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      })
      const { data } = await axios.get(`http://18.136.104.217/api/lipstick/detail/` + this.$route.params.id)
      this.setColor(data)
    }
  },
  data: () => ({
    dialog: false,
    color_name: '',
    rgb: '',
    color_code: ''
  }),
  computed: {
    ...mapGetters([
      'getColor'
    ])
  }
}
</script>