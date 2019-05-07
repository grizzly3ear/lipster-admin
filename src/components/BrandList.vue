<template>
  <v-layout>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for='brand in brands.data' :key='brand.id'>
          <BrandCard :brand='brand'/>
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import BrandCard from '@/components/BrandCard'
import axios from "axios";

export default {
  name: 'brandList',
  components: {
    BrandCard
  },
    methods: {
      async getBrand() {
        const { data } = await axios.get(`http://18.136.104.217/api/lipstick`)
        this.brands = data
      }
    },
    async mounted () {
      this.getBrand()
    },
  data() {
    return {
      info: [],
      selected: [],
      brands: {},
    }
  }
}
</script>