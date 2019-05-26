<template>
    <v-checkbox v-model='selected' primary hide-details></v-checkbox>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: [
    'props'
  ],
  data() {
    return {
      selected: false,
    }
  },
  methods: {
    ...mapActions([
      'setSelectedForDelete'
    ]),
    
  },
  computed: {
    ...mapGetters([
      'getSelectedForDelete'
    ])
  }
}
</script>