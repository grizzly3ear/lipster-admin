<template>
  <v-layout class="operation-icon">
    <v-btn icon @click="onDeleteClick">
      <v-icon color="black">delete</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../utils/axios.js";
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
            .delete(`api/trend/collection/${this.props.item.id}`, {
              data: {
                force: false
              }
            })
            .then(after => {
              if (after.data == 1) {
                //can delete
                Swal.fire("Deleted!", "This item has been deleted.", "success")
                  .catch(error => {
                    Swal.fire(
                      "Deleted!",
                      "This item has been failed to deleted.",
                      "warning"
                    );
                  })
                  .finally(() => {
                    axios
                      .get(`api/trend/collection?part=trend`)
                      .then(({ data }) => {
                        this.setTrendCollection(data.data);
                      });
                  });
              } else {
                Swal.fire({
                  title: "This item has been used!",
                  text: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, force delete it!"
                }).then(result => {
                  if (result.value) {
                    axios
                      .delete(`api/trend/collection/${this.props.item.id}`, {
                        data: {
                          force: true
                        }
                      })
                      .then(after => {
                        if (after.data == 1) {
                          //can delete
                          Swal.fire(
                            "Deleted!",
                            "This item has been deleted.",
                            "success"
                          )
                            .catch(error => {
                              Swal.fire(
                                "Deleted!",
                                "This item has been failed to deleted.",
                                "warning"
                              );
                            })
                            .finally(() => {
                              axios
                                .get(`api/trend/collection?part=trend`)
                                .then(({ data }) => {
                                  this.setTrendCollection(data.data);
                                });
                            });
                        }
                      });
                  }
                });
              }
            });
        }
      });
    }
  },
  props: ["props"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getTrendCollection"])
  }
};
</script>
