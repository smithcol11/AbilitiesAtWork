<template>
  <div>
    <Multiselect
      class="vueform-multiselect"
      :options="props.options"
      :v-model="props.value"
      placeholder="Filter"
      :close-on-select="true"
      :hideSelected="false"
      :searchable="true"
    />
  </div>
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
import { any } from "webidl-conversions";
const props = defineProps({
  options: {
    type: Array,
    default: ["OPTION-1", "OPTION-2", "OPTION-3", "OPTION-4", "OPTION-5"],
  },
  value: {
    type: any,
  },
});

function updateValue(value) {
  this.$emit("input", value);
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<!--

  <template>
    <div>
      <Multiselect
      class="vueform-multiselect"
      v-model="value"
      placeholder="Filter"
      :close-on-select="false"
      :hideSelected="false"
      :options="options"
      :searchable="true"
      />
    </div>
  </template>
  
  <script>
  import Multiselect from "@vueform/multiselect";
  
  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        value: null,
        options: [
        {
          label: "SELECT ALL",
          options: [
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 4",
          "Option 5",
          "Option 6",
          ],
        },
        ],
      };
    },
  };
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

-->
