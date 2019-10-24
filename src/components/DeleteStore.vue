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
    ...mapActions(["setStore"]),
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
            .delete(`api/store/${this.store.id}`)
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
              axios.get(`api/store?part=address`).then(({ data }) => {
                this.setStore(data.data);
              });
            });
        }
      });
    }
  },
  props: ["store"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getStore"])
  }
};
</script>
