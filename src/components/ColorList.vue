<template>
  <v-data-table
    id="color-list"
    :headers="headers"
    :items="getColor.data.colors"
    item-key="getColor.data.colors.id"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <!-- <td>
        <SelectLipstickColorCard :props="props" />
      </td>-->
      <td>
        <v-list v-for="image in props.item.images" :key="image.id">
          <img class="image-container" :src="image.image" />
        </v-list>
      </td>
      <td>
        {{ props.item.color_name }}
        <br />
        <label class="created-at-table">Created: {{getDate(props.item.created_at)}}</label>
      </td>
      <td>
        <div v-html="renderColorBox(props.item.rgb)"></div>
        {{ props.item.rgb }}
      </td>
      <td>{{ props.item.color_code }}</td>
      <td>{{ props.item.composition }}</td>
      <td>
        <EditColor :props="props" />
      </td>
      <td>
        <DeleteColor :props="props" />
      </td>
      <td></td>
    </template>
  </v-data-table>
</template>

<script>
import EditColor from "@/components/EditColor";
import DeleteColor from "@/components/DeleteColor";
// import SelectLipstickColorCard from "@/components/SelectLipstickColorCard";
import axios from "../utils/axios.js";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditColor,
    DeleteColor
    // SelectLipstickColorCard
  },
  methods: {
    ...mapActions(["setColor"]),
    async getColors() {
      const { data } = await axios.get(
        `api/lipstick/detail/${this.$route.params.id}?part=color`
      );
      this.colors = data.data;
      this.setColor(data);
    },
    renderColorBox(rgb) {
      return `<div class='color-box' style="background-color: ${rgb}"></div>`;
    },
    getDate(date) {
      return date.substring(0, 10);
    }
  },
  async mounted() {
    this.getColors();
  },
  data() {
    return {
      selected: [],
      headers: [
        { text: "Image", value: "image" },
        { text: "Color Name", value: "color_name" },
        { text: "RGB", value: "rgb" },
        { text: "Color Code", value: "color_code" },
        { text: "Composition", value: "composition" },
        { text: "Edit" },
        { text: "Delete" },
        { text: "" }
      ],
      colors: {}
    };
  },
  computed: {
    ...mapGetters(["getColor"])
  }
};
</script>



