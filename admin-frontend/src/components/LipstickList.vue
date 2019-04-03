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
      <td>{{ props.item.brand }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.max_price }}</td>
      <td>{{ props.item.min_price }}</td>
      <td>{{ props.item.type }}</td>
      <td>{{ props.item.opacity }}</td>
      <td class="spacial_col">{{ props.item.description }}</td>
      <td>{{ props.item.composition }}</td>
      <td>{{ props.item.apply }}</td>
      <td>{{ props.item.color_name }}</td>
      <td>{{ props.item.rgb }}</td>
      <td>{{ props.item.color_code }}</td>
      <td>{{ props.item.image }}</td>
      <td><EditLipstick/></td>
      <td><ConfirmDelete/></td>
      
    </template>
  </v-data-table>

</template>

<script>
import EditLipstick from "../components/EditLipstick";
import ConfirmDelete from "../components/ConfirmDelete";

  export default {
    components: {
      EditLipstick,
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
          { text: 'Brand', value: 'brand' },
          { text: 'Name', value: 'name' },
          { text: 'Max Price', value: 'max_price' },
          { text: 'Min Price', value: 'min_price' },
          { text: 'Type', value: 'type' },
          { text: 'Opacity', value: 'opacity' },
          { text: 'Description', value: 'description' },
          { text: 'Composition', value: 'composition' },
          { text: 'Apply', value: 'apply' },
          { text: 'Color Name ', value: 'color_name' },
          { text: 'RGB', value: 'rgb' },
          { text: 'Color Code', value: 'color_code' },
          { text: 'Image', value: 'image' },
          { text: 'Edit' },
          { text: 'Delete' }
      
        ],
        desserts: [
          {
            id: 1,
            brand: 'Etudy',
            name: 'Sunshine',
            max_price: 590,
            min_price: 450,
            type: 'Tint',
            opacity: 45,
            description: 'With its 12-hour wear,* comfortable formula and weightless.',
            composition: ' sheer colour to boost their natural tone, procuring a weightless, incredibly comfortable result.',
            apply: 'place the applicator in the center of the lips',
            color_name: 'Lucky',
            rgb: '#454546',
            color_code: 'E05',
            image: 'etudy.png'
          },
          {
            id: 2,
            brand: 'Etudy',
            name: 'Sunshine',
            max_price: 590,
            min_price: 450,
            type: 'Tint',
            opacity: 45,
            description: 'new in from Korea!',
            composition: '',
            apply: '',
            color_name: 'Lucky',
            rgb: '#454546',
            color_code: 'E05',
            image: 'etudy.png'
          },
          {
            id: 3,
            brand: 'Etudy',
            name: 'Sunshine',
            max_price: 590,
            min_price: 450,
            type: 'Tint',
            opacity: 45,
            description: 'new in from Korea!',
            composition: '',
            apply: '',
            color_name: 'Lucky',
            rgb: '#454546',
            color_code: 'E05',
            image: 'etudy.png'
          },
          {
            id: 4,
            brand: 'Etudy',
            name: 'Sunshine',
            max_price: 590,
            min_price: 450,
            type: 'Tint',
            opacity: 45,
            description: 'new in from Korea!',
            composition: '',
            apply: '',
            color_name: 'Lucky',
            rgb: '#454546',
            color_code: 'E05',
            image: 'etudy.png'
          }
        ]
      }
    }
  }
</script>


