<template>
    <v-layout class='operation-icon'>
        <v-btn icon @click='onDeleteClick'>
            <v-icon color="black">delete</v-icon>
        </v-btn>
    </v-layout>
</template>
<script>
import Swal from 'sweetalert2'
import axios from "../utils/axios.js";
import { mapActions, mapGetters } from 'vuex'

export default {
    methods: {
      ...mapActions([
      'setDetail'
    ]),
        onDeleteClick() {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You wont be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`api/lipstick/detail/` + this.props.item.id).then(result => {
                        Swal.fire(
                            'Deleted!',
                            'This item has been deleted.',
                            'success'
                        )
                    }).catch(error => {
                        Swal.fire(
                            'Deleted!',
                            'This item has been failed to deleted.',
                            'warning'
                        )
                    }).finally(() => {
                        axios.get(`api/brand/${this.$route.params.id}/detail`).then(({ data }) => {
                            this.setDetail(data.data)
                        })
                    })
                }
            })
        },
    },
    props: [
        'props'
    ],
    data() {
        return {
        }
    },
    computed: {
      ...mapGetters([
        'getDetail'
      ])
    }
}
</script>
