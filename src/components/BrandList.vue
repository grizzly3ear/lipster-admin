<template>
  <v-layout>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for='brand in brands' :key='brand.id'>
          <BrandCard :brand='brand'/>
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import BrandCard from '@/components/BrandCard'
import axios from '../utils/axios.js'

export default {
  name: 'brandList',
  components: {
    BrandCard
  },
  methods: {
    async getBrand() {
      const { data } = await axios.get(`brand`)
      this.brands = data
    }
  },
  async mounted () {
    this.getBrand()
  },
  data() {
    return {
      info: [],
      brands: [],
    }
  }
}
</script>