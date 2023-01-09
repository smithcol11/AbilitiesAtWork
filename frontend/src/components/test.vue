<template>
  <div>
    <Multiselect
      class="vueform-multiselect"
      v-model="value"
      mode="tags"
      placeholder="Filter XYZ"
      :close-on-select="false"
      :groups="true"
      :options="options"
    />
  </div>
</template>

<script>
  import Multiselect from '@vueform/multiselect'

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        value: null,
        options: [
          {
            label: 'SELECT ALL',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'],
          }
        ]
      }
    }
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>