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
        <SelectStoreAddressCard :props="props" />
      </td>
      <td>{{ props.item.name }}</td>
      <router-link :to="{ name: 'LipstickOfStoreAddress', params: {id: props.item.id}}">
        <td
          style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
        >{{ props.item.address_detail }}</td>
      </router-link>
      <td>{{ props.item.latitude }}</td>
      <td>{{ props.item.longitude }}</td>
      <td>{{ props.item.period }}</td>
      <td>{{ props.item.tel }}</td>
      <td>
        <EditStoreAddress :props="props" />
      </td>
      <td>
        <DeleteStoreAddress :props="props" />
      </td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "../utils/axios";
import EditStoreAddress from "@/components/EditStoreAddress";
import DeleteStoreAddress from "@/components/DeleteStoreAddress";
import SelectStoreAddressCard from "@/components/SelectStoreAddressCard";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditStoreAddress,
    DeleteStoreAddress,
    SelectStoreAddressCard
  },
  methods: {
    ...mapActions(["setStoreAddress"]),
    async getStoreAddresses() {
      const { data } = await axios.get(
        `http://18.136.104.217/api/store/${this.$route.params.id}?part=address`
      );
      this.setStoreAddress(data.data.addresses);
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
        { text: "Branch Name", value: "name" },
        { text: "Detail", value: "address_detail" },
        { text: "Latitude", value: "latitude" },
        { text: "Longitude", value: "longitude" },
        { text: "Time Available", value: "period" },
        { text: "Tel", value: "tel" },
        { text: "Edit" },
        { text: "Delete" }
      ],
      storeAddresses: {}
    };
  },
  computed: {
    ...mapGetters(["getStoreAddress"])
  }
};
</script>
