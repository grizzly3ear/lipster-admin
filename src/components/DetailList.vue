<template>
  <v-data-table
    id="color-list"
    :headers="headers"
    :items="getDetail"
    item-key="getDetail.id"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <!-- <td>
        <SelectLipstickDetailCard :props="props" />
      </td>-->
      <router-link
        :to="{ name: 'LipstickColor', params: {id: props.item.id}}"
        @click.native="onClickDetailList(props.item)"
      >
        <td
          style="text-alin: center; padding-top: 26px; text-decoration: none; display: inline-block;"
        >
          {{ props.item.name }}
          <br />
          <v-icon color="gray">invert_colors</v-icon>
          <label v-text="(props.item.colors || []).length" style="font-size: 14px; color: gray;"></label>
          <label style="font-size: 14px; color: gray;">{{" "}}colors</label>
          <br />
          <label class="created-at-table">Created: {{getDate(props.item.created_at)}}</label>
        </td>
      </router-link>
      <td>{{ props.item.type }}</td>
      <td>{{ props.item.opacity }}</td>
      <td>{{ props.item.description }}</td>
      <td>{{ props.item.apply }}</td>
      <td>
        <EditDetail :props="props" />
      </td>
      <td>
        <DeleteDetail :props="props" />
      </td>
      <td></td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "../utils/axios";
import EditDetail from "@/components/EditDetail";
import DeleteDetail from "@/components/DeleteDetail";
// import SelectLipstickDetailCard from "@/components/SelectLipstickDetailCard";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    EditDetail,
    DeleteDetail
    // SelectLipstickDetailCard
  },
  methods: {
    ...mapActions(["setDetail", "pushBreadcrumb"]),
    async getDetails() {
      const { data } = await axios.get(
        `api/brand/${this.$route.params.id}/detail?part=color`
      );
      this.setDetail(data.data);
    },
    onClickDetailList(detail) {
      this.pushBreadcrumb({
        text: detail.name,
        disabled: true,
        href: `lipstickDetail/${detail.id}`
      });
    },
    getDate(date) {
      return date.substring(0, 10);
    }
  },
  async mounted() {
    this.getDetails();
  },
  data() {
    return {
      brandId: this.$route.params.id,
      props: {},
      selected: [],
      headers: [
        { text: "Collection Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Opacity", value: "opacity" },
        { text: "Description", value: "description" },
        { text: "Apply", value: "apply" },
        { text: "Edit" },
        { text: "Delete" }
      ],
      details: {}
    };
  },
  computed: {
    ...mapGetters(["getDetail"])
  }
};
</script>
