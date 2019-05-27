<template>
  <v-layout>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for='brand in getBrand' :key='brand.id'>
          <BrandCard :brand='brand'/>
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import BrandCard from '@/components/BrandCard'
import axios from '../utils/axios.js'

export default {
  name: 'brandList',
  components: {
    BrandCard
  },
    methods: {
      ...mapActions([
        'setBrand'
      ]),
      async getBrands() {
        const { data } = await axios.get(`brand`)
        this.brands = data
        this.setBrand(data)
      }
    },
    async mounted () {
      this.getBrands()
    },
  data() {
    return {
      info: [],
      brands: [],
    }
  },
  computed: {
    ...mapGetters([
      'getBrand'
    ])
  }
}
</script>