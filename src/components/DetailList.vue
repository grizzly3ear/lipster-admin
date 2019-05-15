<template>
  <v-data-table
    id='color-list'
    v-model='selected'
    :headers='headers'
    :items='details'
    item-key='id'
    select-all
    class='elevation-1'
  >
    <template v-slot:items='props'>
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
      <!-- <td>{{ props.item.description }}</td>
      <td>{{ props.item.composition }}</td>
      <td>{{ props.item.apply }}</td>-->
      <td>
        <EditDetail/>
      </td>
      <td>
        <ConfirmDelete/>
      </td>
      <td></td>
    </template>
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
  data() {
    return {
      brandId: this.$route.params.id,
      panel: [false, true, true],
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
      details: [
        {
          id: 1,
          brand: 'Dior',
          detail: [
            {
              id: 1,
              name: 'Addict Stellar Shine',
              max_price: 1080,
              min_price: 980,
              type: 'balm',
              opacity: 78,
              description:
                'the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior',
              composition: 'A METHYL HYDROGENATED ROSINATE',
              apply: 'A METHYL HYDROGENATED ROSINATE',
              colors: []
            },
            {
              id: 2,
              name: 'Addict Stellar Shine',
              max_price: 1080,
              min_price: 980,
              type: 'balm',
              opacity: 78,
              description:
                'the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior',
              composition: 'A METHYL HYDROGENATED ROSINATE',
              apply: 'A METHYL HYDROGENATED ROSINATE',
              colors: [
                {
                  id: 1,
                  color_name: 'Be Dior',
                  rgb: '#121221',
                  color_code: '976',
                  image: [
                    {
                      id: 1,
                      image: 'bedior.png'
                    }
                  ]
                },
                {
                  id: 2,
                  color_name: 'Lucky',
                  rgb: '#787456',
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
          ]
        },
        {
          id: 3,
          name: "Addict Stellar Shine",
          max_price: 1080,
          min_price: 980,
          type: "balm",
          opacity: 78,
          description:
            "the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior",
          composition: "A METHYL HYDROGENATED ROSINATE",
          apply: "A METHYL HYDROGENATED ROSINATE",
        },
        {
          id: 4,
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
          ]
        },
        {
          id: 5,
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
              id: 5,
              name: 'Addict Stellar Shine',
              max_price: 1080,
              min_price: 980,
              type: 'balm',
              opacity: 78,
              description:
                'the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior',
              composition: 'A METHYL HYDROGENATED ROSINATE',
              apply: 'A METHYL HYDROGENATED ROSINATE',
              colors: [
                {
                  id: 1,
                  color_name: 'Be Dior',
                  rgb: '#121221',
                  color_code: '976',
                  image: [
                    {
                      id: 1,
                      image: 'bedior.png'
                    }
                  ]
                },
                {
                  id: 2,
                  color_name: 'Lucky',
                  rgb: '#787456',
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
          ]
        },
        {
          id: 6,
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
              id: 6,
              name: 'Addict Stellar Shine',
              max_price: 1080,
              min_price: 980,
              type: 'balm',
              opacity: 78,
              description:
                'the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior',
              composition: 'A METHYL HYDROGENATED ROSINATE',
              apply: 'A METHYL HYDROGENATED ROSINATE',
              colors: [
                {
                  id: 1,
                  color_name: 'Be Dior',
                  rgb: '#121221',
                  color_code: '976',
                  image: [
                    {
                      id: 1,
                      image: 'bedior.png'
                    }
                  ]
                },
                {
                  id: 2,
                  color_name: 'Lucky',
                  rgb: '#787456',
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
          ]
        },
        {
          id: 7,
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
              id: 7,
              name: 'Addict Stellar Shine',
              max_price: 1080,
              min_price: 980,
              type: 'balm',
              opacity: 78,
              description:
                'the iconic case with the Dior Addict Stellar Shine design bears a Dior logo in pink, the signature colour of the House of Dior',
              composition: 'A METHYL HYDROGENATED ROSINATE',
              apply: 'A METHYL HYDROGENATED ROSINATE',
              colors: [
                {
                  id: 1,
                  color_name: 'Be Dior',
                  rgb: '#121221',
                  color_code: '976',
                  image: [
                    {
                      id: 1,
                      image: 'bedior.png'
                    }
                  ]
                },
                {
                  id: 2,
                  color_name: 'Lucky',
                  rgb: '#787456',
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
          ]
        }
      ]
    }
  }
}
</script>
