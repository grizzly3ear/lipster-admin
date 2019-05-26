<template>

  <v-data-table
    id='color-list'
    :headers='headers'
    :items='getDetail.data.detail'
    item-key='getDetail.data.detail.id'
    select-all
    class='elevation-1'
  >
    <template v-slot:items='props'>
        <td>
            <SelectLipstickDetailCard :props='props'/>
        </td>
        <router-link :to='{ name: "LipstickColor", params: {id: props.item.id}}'>
        <td
          style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
        >{{ props.item.name }}</td>
      </router-link>
      <td>{{ props.item.min_price }}</td>
      <td>{{ props.item.max_price }}</td>
      <td>{{ props.item.type }}</td>
      <td>{{ props.item.opacity }}</td>
   <!-- <td>{{ props.item.description }}</td>
      <td>{{ props.item.composition }}</td>
      <td>{{ props.item.apply }}</td> -->
      <td>
        <EditDetail :props='props'/>
      </td>
      <td>
        <DeleteDetail :props='props'/>
      </td>
      <td></td> 
    </template>
  </v-data-table>
  
</template>

<script>
import DetailCard from '@/components/DetailCard'
import axios from "axios"
import EditDetail from '@/components/EditDetail'
import DeleteDetail from '@/components/DeleteDetail'
import SelectLipstickDetailCard from '@/components/SelectLipstickDetailCard'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DetailCard,
    EditDetail,
    DeleteDetail,
    SelectLipstickDetailCard
  },
  methods: {
    ...mapActions([
      'setDetail'
    ]),
      async getDetails() {
        const { data } = await axios.get(`http://18.136.104.217/api/brand/` + this.$route.params.id)
        this.details = data
        this.setDetail(data)
      }
    },
    async mounted () {
      this.getDetails()
    },
  data() {
    return {
      brandId: this.$route.params.id,
      props:{},
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
  },
  computed: {
    ...mapGetters([
      'getDetail'
    ])
  }
}
</script>
