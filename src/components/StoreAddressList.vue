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
          @click.native="onClickAddressList(props.item)"
        >
          {{ props.item.name }}
          <br />
          <!-- {{ getLipsticks(props.item.id) ? "" : "" }} -->
          <v-icon color="gray">invert_colors</v-icon>

          <label v-text="(props.item.lipsticks || []).length" style="font-size: 14px; color: gray;"></label>
          <!-- <label v-text="0" style="font-size: 14px; color: gray;" v-else></label> -->
          <label style="font-size: 14px; color: gray;">{{" "}}items</label>
          <br />
          <label class="created-at-table">Created: {{getDate(props.item.created_at)}}</label>
          <br />
        </router-link>
      </td>
      <td>{{ props.item.address_detail }}</td>
      <td>{{ props.item.latitude }}</td>
      <td>{{ props.item.longitude }}</td>
      <td>{{ (props.item.period).substring(0,5) }} - {{(props.item.period).substring(6)}}</td>
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
    ...mapActions(["setStoreAddress", "pushBreadcrumb"]),
    async getStoreAddresses() {
      const { data } = await axios.get(
        `api/store/${this.$route.params.id}?part=address`
      );
      // let store = data.data;
      // store.addresses.forEach(async addresses => {
      //   const { data: lipstick } = await this.getLipsticks(addresses.id);
      //   addresses.lipstick = [...lipstick];
      // });
      this.setStoreAddress(data.data.addresses);
    },
    onClickAddressList(props) {
      this.pushBreadcrumb({
        text: props.name,
        disabled: true,
        href: `storeAddress`
      });
    },
    async getLipsticks(storeAddressId) {
      const { data } = await axios.get(
        `api/store/address/${storeAddressId}/lipstickColors`
      );
      return data;
    },
    getDate(date) {
      return date.substring(0, 10);
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
    ...mapGetters(["getStoreAddress"])
  },
  watch: {
    getStoreAddresses(val) {
      console.log(val);
    }
  }
};
</script>
