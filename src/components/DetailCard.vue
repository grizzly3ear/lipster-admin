<template>
  <v-data-table> 
        <td>
            <v-checkbox v-model='props.selected' primary hide-details></v-checkbox>
        </td>
        <router-link :to='{ name: "LipstickColor", params: {}}'>
        <td
          style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
        >{{ props.item.name }}</td>
      </router-link>
      <td>{{ props.item.min_price }}</td>
      <td>{{ props.item.max_price }}</td>
      <td>{{ props.item.type }}</td>
      <td>{{ props.item.opacity }}</td>
   <td>{{ props.item.description }}</td>
      <td>{{ props.item.composition }}</td>
      <td>{{ props.item.apply }}</td>
      <td>
        <EditDetail/>
      </td>
      <td>
        <ConfirmDelete/>
      </td>
      <td></td> 
  </v-data-table>
</template>

<script>
import EditDetail from '../components/EditDetail'
import ConfirmDelete from '../components/ConfirmDelete'

export default {
  components: {
    EditDetail,
    ConfirmDelete
  },
  props: [
        'props'
    ],
  data() {
    return {
      brandId: this.$route.params.id,
      panel: [ true, true],
      selected: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Min Price", value: "min_price" },
        { text: "Max Price", value: "min_price" },
        { text: "Type", value: "type" },
        { text: "Opacity", value: "opacity" },
        // { text: "Description", value: "description" },
        // { text: "Composition", value: "composition" },
        // { text: "Apply", value: "apply" },
        { text: "Edit" },
        { text: "Delete" },
        { text: "" }
      ],
      details: {}
    }
  }
}
</script>
