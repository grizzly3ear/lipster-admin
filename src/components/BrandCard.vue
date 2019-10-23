<template>
  <v-layout>
    <v-flex xs12 sm6 md4>
      <v-container style="padding: 0 !imaportant;">
        <!-- <div class="check-brand">
          <v-checkbox v-model="selected" primary hide-details></v-checkbox>
        </div>-->
        <v-container class="brand-container">
          <v-layout column>
            <v-flex offset-md7 md3>
              <v-layout row>
                <v-flex>
                  <EditBrand :brand="brand" />
                </v-flex>
                <v-flex>
                  <DeleteBrand :brand="brand" />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <router-link
                :to="{ name: 'LipstickDetail', params: {id: brand.id}}"
                @click.native="onClickBrandCard(brand)"
              >
                <v-layout column>
                  <v-flex class="img-upper-force">
                    <v-img :src="brand.image" class="brandList" position="center center"></v-img>
                  </v-flex>
                  <v-flex class="name-upper-force">
                    <label class="brand" v-text="brand.name"></label>
                  </v-flex>
                </v-layout>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import EditBrand from "@/components/EditBrand";
import DeleteBrand from "@/components/DeleteBrand";
import axios from "../utils/axios.js";

export default {
  name: "brandCard",
  components: {
    EditBrand,
    DeleteBrand
  },
  methods: {
    ...mapActions(["setBrand", "pushBreadcrumb"]),
    onClickBrandCard(brand) {
      this.pushBreadcrumb({
        text: brand.name,
        disabled: true,
        href: `/lipstickBrand`
      });
    }
  },
  props: ["brand"],
  data() {
    return {
      info: [],
      selected: []
      // imagePlaceholder: require("@/assets/lipstickList.png")
    };
  },
  computed: {
    ...mapGetters(["getBrand"])
  }
};
</script>