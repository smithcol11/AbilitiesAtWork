
<script setup>
import JobAdd from "../components/AddClient.vue";
import SearchView from "../components/SearchClient.vue";
import { ref } from "vue";

const isSearchOption = ref(true);
const isAddOption = ref(false);

function ChangePageView() {
  isAddOption.value = !isAddOption.value;
  isSearchOption.value = !isSearchOption.value;
  console.log(isSearchOption.value)
}

</script>
<template>
  <div class=" text-center ">
  <button class="duration-300 mr-5 bg-accentDark hover:bg-accentLight  px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded" 
  @click="ChangePageView()"
  >
      Add Client
</button>
<button class="duration-300 ml-5 bg-accentDark hover:bg-accentLight px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded" 
@click="ChangePageView()"
>
      Search Clients
</button>
<form>
        <div v-if="isSearchOption">
          <SearchView />
        </div>
        <div v-if="isAddOption">
          <JobAdd />
        </div>
      </form>
 </div>
 
</template>

<style></style>