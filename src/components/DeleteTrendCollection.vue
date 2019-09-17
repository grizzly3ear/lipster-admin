<template>
  <v-layout class="operation-icon">
    <v-btn icon @click="onDeleteClick">
      <v-icon color="black">delete</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../utils/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["setTrendCollection"]),
    onDeleteClick() {
      Swal.fire({
        title: "Are you sure?",
        text: "You wont be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(
              `http://18.136.104.217/api/trend/collection/${this.trendCollection.id}`
            )
            .then(result => {
              Swal.fire("Deleted!", "This item has been deleted.", "success");
            })
            .catch(error => {
              Swal.fire(
                "Deleted!",
                "This item has been failed to deleted.",
                "warning"
              );
            })
            .finally(() => {
              axios
                .get(`http://18.136.104.217/api/trend/collection`)
                .then(({ data }) => {
                  this.setTrendCollection(data.data);
                });
            });
        }
      });
    }
  },
  props: ["trendCollection"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>
