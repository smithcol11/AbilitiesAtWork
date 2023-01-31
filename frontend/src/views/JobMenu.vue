<script setup>
import JobAdd from "../components/AddJob.vue";
import SearchView from "../components/SearchJobs.vue";
import { ref } from "vue";

const isSearchOption = ref(true);
const isAddOption = ref(false);

function ChangePageView1() {
  
  if(isAddOption.value)
  {
    return;
  }
  else
  {
  isAddOption.value = !isAddOption.value;
  isSearchOption.value = !isSearchOption.value;
  }
  }

function ChangePageView2(){
  if(isSearchOption.value)
  {
    return;
  }
  else
  {
  isAddOption.value = !isAddOption.value;
  isSearchOption.value = !isSearchOption.value;
  }

}

</script>
<template>
  <div class=" text-center ">
  <button class="duration-300 mr-5 bg-accentDark hover:bg-accentLight  visited:bg-slate-100  px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded" 
  @click="ChangePageView1()"
  >
      Add Job
</button>
<button class="duration-300 ml-5 bg-accentDark hover:bg-accentLight px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded" 
@click="ChangePageView2()"
>
      Search Jobs
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