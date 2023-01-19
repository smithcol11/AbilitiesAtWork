<template>
  <div class="flex flex-row text-lg">
    <div class="grow basis-0 p-2" v-for="filter in filters">
      <div class="pb-0.5"> {{ filter.title }} </div>
      <Filter :options="filter.options" />
    </div>
  </div>
</template>

<script>
import Filter from "../components/Filter.vue";

export default {
  components: {
    Filter,
  },
  props: {
    filters: Object,
  },
};
</script>