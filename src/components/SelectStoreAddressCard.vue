<template>
  <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
</template>

<script>
export default {
  props: ["props"],
  data() {
    return {
      selected: {}
    };
  }
};
</script>