<template>
  <v-layout>
    <v-flex xs12 sm6 md4>
      <v-container style="padding: 0 !imaportant;">
        <v-container class="brand-container">
          <v-layout column>
            <v-flex offset-md6 md2>
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
              <router-link
                :to="{ name: 'StoreAddress', params: {id: store.id}}"
                @click.native="onClickStoreCard(store)"
              >
                <v-layout column>
                  <v-flex class="img-upper-force">
                    <v-img :src="store.image" class="brandList" position="center center"></v-img>
                  </v-flex>
                  <v-flex class="name-upper-force">
                    <label class="brand" v-text="store.name"></label>
                    <label
                      style="font-size: 14px; color: gray; float: right; margin: 5.5px 0px 0px 0px; margin-left: 2px;"
                    >branches</label>
                    <label
                      class="num-branch"
                      v-text=" (store.addresses || []).length"
                      style="font-size: 16px"
                    ></label>
                    <v-icon class="num-branch" color="gray">store</v-icon>
                    <div class="created-at">Created: {{getDate(store.created_at)}}</div>
                  </v-flex>
                  <v-flex></v-flex>
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
import axios from "../utils/axios.js";

export default {
  name: "storeCard",
  components: {
    EditStore,
    DeleteStore
  },
  methods: {
    ...mapActions(["setStore", "pushBreadcrumb"]),
    onClickStoreCard(store) {
      this.pushBreadcrumb({
        text: store.name,
        disabled: true,
        href: `/Store`
      });
    },
    getDate(date) {
      return date.substring(0, 10);
    }
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