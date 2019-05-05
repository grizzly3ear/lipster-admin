<template>
  <v-layout>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for='brand in brands' :key='brand.id'>
          <v-flex xs12 sm6 md4>
            <div class='brand-list'>
              <div class='check-brand'>
                <v-checkbox v-model='selected' primary hide-details></v-checkbox>
              </div>
              <div class='brand-container'>
                <div class='operation-tab'>
                  <div class='operation-side'>
                    <EditBrand/>
                  </div>
                  <div class='operation-side'>
                    <ConfirmDelete/>
                  </div>
                </div>
                <router-link :to='{ name: "LipstickDetail", params: { id: brand.id}}'>
                  <div class='brand'>
                    <table>
                      <tr>
                        <td rowspan='3'>
                          <img class='lipstickList' :src='require("../assets/lipstickList.png")'>
                        </td>
                      </tr>
                      <tr></tr>
                      <tr></tr>
                      <tr>
                        <td>
                          <label class='brand' v-text='brand.brand'></label>
                        </td>
                      </tr>
                    </table>
                  </div>
                </router-link>
              </div>
            </div>
          </v-flex>
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import EditBrand from '@/components/EditBrand'
import ConfirmDelete from '@/components/ConfirmDelete'

export default {
  // mounted () {
  //   axios
  //     .get('http://localhost:8000/api/lipstick/')
  //     .then(response => {(this.brand = response)
  //     console.log(this.info)
  //     })
  // },
  components: {
    EditBrand,
    ConfirmDelete
  },
  // methods: {
  //   async getBrand () {
  //     const {data} = await axios.get(`http://localhost:8000/api/lipstick/`)
  //     this.brands = data
  //   }
  // },
  // async mounted () {
  //   this.getBrand()
  // },
  data() {
    return {
      info: [],
      selected: [],
      // brands: {},
      brands: [
        {
          id: 1,
          brand: "Dior",
          detail: [
            {
              id: 1,
              name: "Addict Stellar Shine",
              max_price: 1080,
              min_price: 980,
              type: "balm",
              opacity: 78,
              description:
                "the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior",
              composition: "A METHYL HYDROGENATED ROSINATE",
              apply: "A METHYL HYDROGENATED ROSINATE",
              colors: [
                {
                  id: 1,
                  color_name: "Be Dior",
                  rgb: "#121221",
                  color_code: "976",
                  image: [
                    {
                      id: 1,
                      image: "bedior.png"
                    }
                  ]
                },
                {
                  id: 2,
                  color_name: "Lucky",
                  rgb: "#787456",
                  color_code: "536",
                  image: [
                    {
                      id: 2,
                      image: "lucky.png"
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              name: "ooooo",
              max_price: 45,
              min_price: 41,
              type: "oo",
              opacity: 89,
              description: "ooooooooo",
              composition: "oooo oooooooooo",
              apply: "oooooooooo",
              colors: []
            }
          ]
        },
        {
          id: 2,
          brand: "Naree",
          detail: []
        },
        {
          id: 4,
          brand: "AAAAAA",
          detail: []
        },
        {
          id: 9,
          brand: "BBBBB",
          detail: []
        },
        {
          id: 10,
          brand: "TTTTTTTTT",
          detail: [
            {
              id: 5,
              name: "ttCCCt",
              max_price: 1117,
              min_price: 457,
              type: "cccy",
              opacity: 85,
              description: "ttt",
              composition: "ttt",
              apply: "tttt",
              colors: []
            }
          ]
        },
        {
          id: 11,
          brand: "OOO",
          detail: [
            {
              id: 6,
              name: "OO",
              max_price: 1117,
              min_price: 457,
              type: "oo",
              opacity: 85,
              description: "ooooo",
              composition: "oo",
              apply: "oooo oooo",
              colors: []
            }
          ]
        },
        {
          id: 12,
          brand: "Naree",
          detail: []
        },
        {
          id: 13,
          brand: "Naree",
          detail: []
        },
        {
          id: 14,
          brand: "Naree",
          detail: []
        },
        {
          id: 15,
          brand: "Naree",
          detail: []
        },
        {
          id: 16,
          brand: "Naree",
          detail: []
        },
        {
          id: 17,
          brand: "Naree",
          detail: []
        },
        {
          id: 18,
          brand: "Naree",
          detail: []
        }
      ]
    }
  }
}
</script>