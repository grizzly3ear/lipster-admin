<template>
  <v-layout>
    <v-flex xs12 sm6 md4>
      <v-container style="padding: 0 !imaportant;">
        <v-container class="brand-container">
          <v-layout column>
            <v-flex offset-md7 md3>
              <v-layout row>
                <v-flex>
                  <EditStore :store="store" />
                </v-flex>
                <v-flex>
                  <DeleteStore :store="store" />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <router-link :to="{ name: 'StoreAddress', params: {id: store.id}}">
                <v-layout column>
                  <v-flex class="img-upper-force">
                    <v-img :src="store.image" class="brandList" position="center center"></v-img>
                  </v-flex>
                  <v-flex class="name-upper-force">
                    <label class="brand" v-text="store.name"></label>
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
import EditStore from "@/components/EditStore";
import DeleteStore from "@/components/DeleteStore";
import axios from "axios";

export default {
  name: "storeCard",
  components: {
    EditStore,
    DeleteStore
  },
  methods: {
    ...mapActions(["setStore"])
  },
  props: ["store"],
  data() {
    return {
      info: [],
      selected: []
    };
  },
  computed: {
    ...mapGetters(["getStore"])
  }
};
</script>