<template>
  <v-layout>
    <v-flex xs12 sm6 md4>
      <v-container style="padding: 0 !imaportant;">
        <v-container class="brand-container">
          <v-layout column>
            <v-flex offset-md7 md3>
              <v-layout row>
                <v-flex>
                  <EditTrendCollection :trendCollection="trendCollection" />
                </v-flex>
                <v-flex>
                  <DeleteTrendCollection :trendCollection="trendCollection" />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <router-link :to="{ name: 'Trend', params: {id: trendCollection.id}}">
                <label class="num-branch" v-text=" store.addresses.length" style="font-size: 16px"></label>
                <v-icon class="num-branch" color="gray">store</v-icon>
                <v-layout column>
                  <v-flex class="img-upper-force">
                    <v-img :src="trendCollection.image" class="brandList" position="center center"></v-img>
                  </v-flex>
                  <v-flex class="name-upper-force">
                    <label class="brand" v-text="trendCollection.name"></label>
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
import EditTrendCollection from "@/components/EditTrendCollection";
import DeleteTrendCollection from "@/components/DeleteTrendCollection";
import axios from "../utils/axios.js";

export default {
  name: "trendCollectionCard",
  components: {
    EditTrendCollection,
    DeleteTrendCollection
  },
  methods: {
    ...mapActions(["setTrendCollection"])
  },
  props: ["trendCollection"],
  data() {
    return {
      info: [],
      selected: []
    };
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>