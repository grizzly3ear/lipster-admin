<template>
  <v-layout>
    <v-flex xs12 sm6 md4>
      <div class='brand-list'>
        <div class='check-brand'>
          <v-checkbox v-model='selected' primary hide-details></v-checkbox>
        </div>
        <div class='brand-container'>
          <div class='operation-tab'>
            <div class='operation-side'>
              <EditBrand :brand='brand'/>
            </div>
            <div class='operation-side'>
              <DeleteBrand :brand='brand'/>
            </div>
          </div>
          <router-link :to='{ name: "LipstickDetail", params: {id: brand.id}}'>
            <div class='brand'>
              <table>
                <tr>
                  <td rowspan='3'>
                    <img class='lipstickList' :src='require("@/assets/lipstickList.png")'>
                  </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr>
                  <td>
                    <label class='brand' v-text='brand.name'></label>
                  </td>
                </tr>
              </table>
            </div>
          </router-link>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
import EditBrand from '@/components/EditBrand'
import DeleteBrand from '@/components/DeleteBrand'
import axios from "axios";

export default {
  name: 'brandCard',
  components: {
    EditBrand,
    DeleteBrand
  },
  props: [
        'brand'
        ],
  data() {
    return {
      info: [],
      selected: [],
      
    }
  }
}
</script>