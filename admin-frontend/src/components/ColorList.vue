<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.image" label="Image"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.color_name" label="Color name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.rgb" label="RGB"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.color_code" label="Color code"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="lipsticks"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.image }}</td>
        <td class="text-xs-right">{{ props.item.color_name }}</td>
        <td class="text-xs-right">{{ props.item.rgb }}</td>
        <td class="text-xs-right">{{ props.item.color_code }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Image', value: 'image' },
        { text: 'Color Name', value: 'color_name' },
        { text: 'RGB', value: 'rgb' },
        { text: 'Color Code', value: 'color_code' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        image: '',
        color_name: '',
        rgb: '',
        color_code: ''
      },
      defaultItem: {
        image: '',
        color_name: '',
        rgb: '',
        color_code: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.lipsticks = [
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
      },

      editItem (item) {
        this.editedIndex = this.color_name.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.color_name.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.color_name.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>