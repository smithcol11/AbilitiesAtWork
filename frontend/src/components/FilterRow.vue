<template>
  <div class="flex flex-row text-lg">
    <div class="w-1/6 p-2" v-for="filter in filters">
      <div class="pb-0.5"> {{ filter.title }} </div>
      <Filter :options="filter.options"/>
    </div>
  </div>
</template>

<script>
import Filter from "../components/Filter.vue";

export default {
  name: "App",
  components: {
    Filter,
  },
  data() {
    return {
      filters: [
        {
          title: "Organization: ",
          options: ['Option A', 'Option B', 'Option Q', 'Option Z'],
        },
        {
          title: "Position: ",
          options: ['Option C', 'Option D', 'Option V', 'Option Y', 'Option R'],
        },
        {
          title: "Shift: ",
          options: ['Option E', 'Option F', 'Option J'],
        },
        {
          title: "County: ",
          options: ['Option G', 'Option H', 'Option M', 'Option E'],
        },
        {
          title: "Contact: ",
          options: ['Option I', 'Option P'],
        },
      ]
    }
  },
};
</script>

<style> </style>