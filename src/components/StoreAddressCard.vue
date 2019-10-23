<template>
  <v-data-table
    id="color-list"
    :headers="headers"
    :items="getStoreAddress"
    item-key="getStoreAddress.id"
    select-all
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>
        <!-- <SelectLipstickDetailCard :props='props'/> -->
      </td>
      <!-- <router-link :to='{ name: "LipstickColor", params: {id: props.item.id}}'> -->
      <td
        style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
      >{{ props.item.address_detail }}</td>
      <!-- </router-link> -->
      <td>{{ props.item.latitute }}</td>
      <td>{{ props.item.longtitute }}</td>
      <td>
        <EditStoreAddress :props="props" />
      </td>
      <td>
        <DeleteStoreAddress :props="props" />
      </td>
      <td></td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "../utils/axios";
import EditStoreAddress from "@/components/EditStoreAddress";
import DeleteStoreAddress from "@/components/DeleteStoreAddress";
// import SelectLipstickDetailCard from '@/components/SelectLipstickDetailCard'
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditStoreAddress,
    DeleteStoreAddress
    // SelectLipstickDetailCard
  },
  methods: {
    ...mapActions(["setStoreAddress"]),
    async getStoreAddresses() {
      const { data } = await axios.get(
        `api/store/${this.$route.params.id}` +
          `?part=address`
      );
      this.setStoreAddress(data.data);
    }
  },
  async mounted() {
    this.getStoreAddresses();
  },
  data() {
    return {
      storeId: this.$route.params.id,
      props: {},
      selected: [],
      headers: [
        { text: "Detail", value: "address_detail" },
        { text: "Latitute", value: "latitute" },
        { text: "Longtitute", value: "longtitute" },
        { text: "Edit" },
        { text: "Delete" },
        { text: "" }
      ],
      storeAddresses: {}
    };
  },
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>
