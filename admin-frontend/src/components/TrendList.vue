<template>

  <v-data-table id="table-list"
    v-model="selected"
    :headers="headers"
    :items="desserts"
    item-key="name"
    select-all
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.year }}</td>
      <td>{{ props.item.image }}</td>
      <td>{{ props.item.skin_color }}</td>
      <td>{{ props.item.lipstick_color_id }}</td>
      <td><EditTrend/></td>
      <td><ConfirmDelete/></td>
      
    </template>
  </v-data-table>

</template>

<script>
import EditTrend from "../components/EditTrend";
import ConfirmDelete from "../components/ConfirmDelete";

  export default {
    components: {
      EditTrend,
      ConfirmDelete
    },
    data () {
      return {
        selected: [],
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Title', value: 'title' },
          { text: 'Year', value: 'year' },
          { text: 'Image', value: 'image' },
          { text: 'Skin color', value: 'skin_color' },
          { text: 'Lipstick color ID', value: 'lipstick_color_id' },
          { text: 'Edit' },
          { text: 'Delete' }
      
        ],
        desserts: [
          {
            id: 1,
            title: 'Hot Summer Lipstick',
            year: 2019,
            image: 'summer2019.png',
            skin_color: '#365454',
            lipstick_color_id: 1
          },
          {
            id: 2,
            title: 'Hot Summer Lipstick',
            year: 2019,
            image: 'summer2019.png',
            skin_color: '#365454',
            lipstick_color_id: 1
          },
          {
            id: 3,
            title: 'Hot Summer Lipstick',
            year: 2019,
            image: 'summer2019.png',
            skin_color: '#365454',
            lipstick_color_id: 1
          },
          {
            id: 4,
            title: 'Hot Summer Lipstick',
            year: 2019,
            image: 'summer2019.png',
            skin_color: '#365454',
            lipstick_color_id: 1
          }
        ]
      }
    }
  }
</script>


