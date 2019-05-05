<template>

  <v-data-table id='color-list'
    v-model='selected'
    :headers='headers'
    :items='colors'
    item-key='name'
    select-all
    class='elevation-1'
  >
    <template v-slot:items='props'>
      <td>
        <v-checkbox
          v-model='props.selected'
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td><img class='lip-example' :src='require("../assets/lip-example.jpg")'/></td>
      <td>{{ props.item.color_name }}</td>
      <td><div class='color-box' ></div>  {{ props.item.rgb }}</td>
      <td>{{ props.item.color_code }}</td>      
      <td><EditColor/></td>
      <td><ConfirmDelete/></td>
      <td></td>
    </template>
  </v-data-table>

</template>

<script>
import EditColor from '../components/EditColor'
import ConfirmDelete from '../components/ConfirmDelete'

  export default {
    components: {
      EditColor,
      ConfirmDelete
    },
    data () {
      return {
        selected: [],
        headers: [
          { text: 'Image', value: 'image' },
          { text: 'Color Name', value: 'color_name' },
          { text: 'RGB', value: 'rgb' },
          { text: 'Color Code', value: 'color_code' },
          { text: 'Edit' },
          { text: 'Delete'},
          { text: ''}
      
        ],
              colors: [
                {
                  id: 1,
                  color_name: 'Be Dior',
                  rgb: '#DC143C',
                  color_code: '976',
                  image: [
                    {
                      id: 1,
                      image: '../assests/lip-example.jpg'
                    }
                  ]
                },
                {
                  id: 2,
                  color_name: 'Lucky',
                  rgb: '#DC143C',
                  color_code: '536',
                  image: [
                    {
                      id: 2,
                      image: 'lucky.png'
                    }
                  ]
                },
                {
                  id: 3,
                  color_name: 'Lucky',
                  rgb: '#DC143C',
                  color_code: '536',
                  image: [
                    {
                      id: 2,
                      image: 'lucky.png'
                    }
                  ]
                },
                {
                  id: 4,
                  color_name: 'Lucky',
                  rgb: '#DC143C',
                  color_code: '536',
                  image: [
                    {
                      id: 2,
                      image: 'lucky.png'
                    }
                  ]
                },
                {
                  id: 5,
                  color_name: 'Lucky',
                  rgb: '#DC143C',
                  color_code: '536',
                  image: [
                    {
                      id: 2,
                      image: 'lucky.png'
                    }
                  ]
                },
                {
                  id: 6,
                  color_name: 'Lucky',
                  rgb: '#DC143C',
                  color_code: '536',
                  image: [
                    {
                      id: 2,
                      image: 'lucky.png'
                    }
                  ]
                },
                {
                  id: 7,
                  color_name: 'Lucky',
                  rgb: '#DC143C',
                  color_code: '536',
                  image: [
                    {
                      id: 2,
                      image: 'lucky.png'
                    }
                  ]
                }
              ]
      }
    }
  }
</script>


