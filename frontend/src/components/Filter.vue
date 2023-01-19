<template>
  <Multiselect
    class="vueform-multiselect"
    mode="multiple"
    placeholder="Filter"
    :close-on-select="false"
    :groups="true"
    :hideSelected="false"
    :options="optionGroups"
    :v-model="null"
  />
</template>

<script>
  import Multiselect from '@vueform/multiselect'

  export default {
    components: {
      Multiselect,
    },
    props: {
      options: [String],
    },
    data() {
      return {
        optionGroups: [
          {
            label: 'SELECT ALL',
            options: this.options,
          }
        ]
      }
    },
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>