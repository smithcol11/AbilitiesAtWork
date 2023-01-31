<script setup>
import JobAdd from "../components/AddJob.vue";
import SearchView from "../components/SearchJobs.vue";
import { ref } from "vue";

const isSearchOption = ref(true);
const isAddOption = ref(false);

const activeBtnClass = ["bg-accentLight", "text-dark"];

function ChangePageView1() {
  let otherBtn1 = document.getElementById("addJob");
  let otherBtn = document.getElementById("searchJob");
  otherBtn1.classList.add(...activeBtnClass)
  otherBtn.classList.remove(...activeBtnClass);
    if(isAddOption.value) return;
    else
    {
      isAddOption.value = !isAddOption.value;
      isSearchOption.value = !isSearchOption.value;
    }
  }

function ChangePageView2(){
  let otherBtn = document.getElementById("searchJob");
  let otherBtn1 = document.getElementById("addJob");
  otherBtn.classList.add(...activeBtnClass)
  otherBtn1.classList.remove(...activeBtnClass);
    if(isSearchOption.value) return
    else
    {
    isAddOption.value = !isAddOption.value;
    isSearchOption.value = !isSearchOption.value;
    }
}


</script>
<template>
  <div class="text-center">
    <button
      class="duration-300 mr-5 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
  @click="ChangePageView1()"
      id="addJob"
  > 
      Add Job
</button>
    <button
      class="duration-300 ml-5 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
@click="ChangePageView2()"
      id="searchJob"
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
