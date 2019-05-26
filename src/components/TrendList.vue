<template>

  <v-data-table id='table-list'
    :headers='headers'
    :items='getTrend.data'
    item-key='name'
    select-all
    class='elevation-1'
  >
    <template v-slot:items='props'>
      <td>
        <SelectTrendCard :props='props'/>
      </td>
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.year }}</td>
      <td> <img class="image-container" :src="props.item.image"/></td>
      <td>
        <div v-html='renderSkinColorBox(props.item.skin_color)'></div> 
        {{ props.item.skin_color }}
      </td>
      <td>
        <div v-html='renderColorBox(props.item.color.rgb)'></div>
        {{ props.item.color.rgb }}
      </td>
      <td>{{ props.item.description }}</td>
      <td><EditTrend :props='props'/></td>
      <td><DeleteTrend :props='props'/></td>
      
    </template>
  </v-data-table>

</template>

<script>
import EditTrend from '../components/EditTrend'
import DeleteTrend from '../components/DeleteTrend'
import SelectTrendCard from '../components/SelectTrendCard'
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      EditTrend,
      DeleteTrend,
      SelectTrendCard
    },
    methods: {
      ...mapActions([
        'setTrend'
      ]),
      async getTrends() {
        const { data } = await axios.get(`http://18.136.104.217/api/trend`)
        this.trends = data
        this.setTrend(data)
      },
      renderSkinColorBox(rgb) {
        return (
          `<div class='color-box' style="background-color: ${rgb}"></div>`
        )
      },
      renderColorBox(rgb) {
        return (
          `<div class='color-box' style="background-color: ${rgb}"></div>`
        )
      }
    },
    async mounted () {
      this.getTrends()
    },
    data () {
      return {
        selected: [],
        trends: {},
        props: {},
        headers: [
          { text: 'Title', value: 'title' },
          { text: 'Year', value: 'year' },
          { text: 'Image', value: 'image' },
          { text: 'Skin color', value: 'skin_color' },
          { text: 'Lipstick color', value: 'lipstick_color_id' },
          { text: 'Description', value: 'Description' },
          { text: 'Edit' },
          { text: 'Delete' }
      
        ],
      }
    },
    computed: {
    ...mapGetters([
      'getTrend'
    ])
  }
}
</script>


