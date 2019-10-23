<template>
  <v-data-table
    id="color-list"
    :headers="headers"
    :items="getLipstickOfStoreAddress"
    item-key="getLipstickOfStoreAddress.id"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <!-- <td>
        <SelectLipstickColorCard :props="props" />
      </td>-->
      <td>
        <img class="image-container" :src="props.item.brand.image" />
      </td>
      <td>{{ props.item.brand.name }}</td>
      <td>{{ props.item.detail.name }}</td>
      <td>{{ props.item.detail.type }}</td>
      <td>
        <v-list v-for="image in props.item.images" :key="image.id">
          <img class="image-container" :src="image.image" />
        </v-list>
      </td>
      <td>{{ props.item.color_name }}</td>
      <td>
        <div v-html="renderColorBox(props.item.rgb)"></div>
        {{ props.item.rgb }}
      </td>
      <td>{{ props.item.color_code }}</td>
      <td>{{ props.item.price }}</td>
      <td>
        <EditLipstick :props="props" />
      </td>
      <td>
        <DeleteLipstick :props="props" />
      </td>
    </template>
  </v-data-table>
</template>

<script>
import EditLipstick from "@/components/EditLipstick";
import DeleteLipstick from "@/components/DeleteLipstick";
// import SelectLipstickColorCard from "@/components/SelectLipstickColorCard";
import axios from "../utils/axios.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditLipstick,
    DeleteLipstick
    // SelectLipstickColorCard
  },
  methods: {
    ...mapActions(["setLipstickOfStoreAddress"]),
    async getLipsticks() {
      const { data } = await axios.get(
        `api/store/address/${this.$route.params.id}/lipstickColors?part=brand,detail`
      );
      this.setLipstickOfStoreAddress(data.data);
    },
    renderColorBox(rgb) {
      return `<div class='color-box' style="background-color: ${rgb}"></div>`;
    }
  },
  async mounted() {
    this.getLipsticks();
  },
  computed: {
    ...mapGetters(["getLipstickOfStoreAddress"])
  },
  data() {
    return {
      // selected: [],
      headers: [
        { text: "Brand Image", value: "name" },
        { text: "Brand Name", value: "brand_name" },
        { text: "Collection Name", value: "collection_name" },
        { text: "Type", value: "type" },
        { text: "Color Image", value: "color_image" },
        { text: "Color Name", value: "color_name" },
        { text: "RGB", value: "rgb" },
        { text: "Color Code", value: "color_code" },
        { text: "Price", value: "price" },
        { text: "Edit" },
        { text: "Delete" }
      ]
    };
  }
};
</script>



