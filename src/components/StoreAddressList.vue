<template>
  <v-data-table
    id="color-list"
    :headers="headers"
    :items="getStoreAddress"
    item-key="getStoreAddress.id"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td style="text-align: center;">
        <router-link
          :to="{ name: 'LipstickOfStoreAddress', params: {id: props.item.id}}"
          style="text-decoration: none !important; display: inline-block;"
        >
          {{ props.item.name }}
          <br />
          {{ getLipsticks(props.item.id) ? "" : "" }}
          <v-icon color="gray">invert_colors</v-icon>
          <label v-text="numOfLipstick" style="font-size: 14px; color: gray;"></label>
          <label style="font-size: 14px; color: gray;">{{" "}}items</label>
        </router-link>
      </td>
      <td>{{ props.item.address_detail }}</td>
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditStoreAddress,
    DeleteStoreAddress
  },
  methods: {
    ...mapActions(["setStoreAddress", "setLipstickOfStoreAddress"]),
    async getStoreAddresses() {
      const { data } = await axios.get(
        `api/store/${this.$route.params.id}?part=address`
      );
      this.setStoreAddress(data.data.addresses);
    },
    async getLipsticks(storeAddressId) {
      const { data } = await axios.get(
        `api/store/address/${storeAddressId}/lipstickColors`
      );
      this.numOfLipstick = data.data.length;
      return "";
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
      storeAddresses: {},
      numOfLipstick: 0
    };
  },
  computed: {
    ...mapGetters(["getStoreAddress", "getLipstickOfStoreAddress"])
  }
};
</script>
