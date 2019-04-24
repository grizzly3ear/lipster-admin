<template>
  <v-layout>
    Brand ID:{{brandId}}
    <br>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-list v-for="lipstick in lipsticks" :key="lipstick.id">
          <v-flex xs12 sm6 md4>
            <div class="detail-list">
              <v-list v-for="lipstickDetail in lipstick.detail" :key="lipstickDetail.id">
                <div class="check-detail">
                  <v-checkbox v-model="selected" primary hide-details></v-checkbox>
                </div>
                <router-link :to="{ name: 'LipstickColor', params: {}}">
                <div class="detail-container">
                  <table>
                    <tr>
                      <td class="table-left">Name:</td>
                      <td class="table-right">
                        <label class="detail-name" v-text="lipstickDetail.name"></label>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-left">price:</td>
                      <td class="table-right">
                        <label v-text="lipstickDetail.min_price"></label>
                        -
                        <label v-text="lipstickDetail.max_price"></label>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-left">Type:</td>
                      <td class="table-right">
                        <label v-text="lipstickDetail.type"></label>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-left">Opacity:</td>
                      <td class="table-right">
                        <label v-text="lipstickDetail.opacity"></label>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-left">Description:</td>
                      <td class="table-right">
                        <label v-text="lipstickDetail.description"></label>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-left">Composition:</td>
                      <td class="table-right">
                        <label v-text="lipstickDetail.composition"></label>
                      </td>
                    </tr>
                    <tr>
                      <td class="table-left">Apply:</td>
                      <td class="table-right">
                        <label v-text="lipstickDetail.apply"></label>
                      </td>
                    </tr>
                  </table>
                </div>
                </router-link>
              </v-list>
            </div>
          </v-flex>
        </v-list>
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      brandId: this.$route.params.id,
      selected: [],
      lipsticks: [
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
        }
      ]
    };
  }
};
</script>