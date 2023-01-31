<script setup>
import JobAdd from "../components/AddJob.vue";
import SearchView from "../components/SearchJobs.vue";
import { ref } from "vue";

const isSearchOption = ref(true);
const isAddOption = ref(false);

const activeBtnClass = ["bg-accentLight", "text-dark"];

function ChangePageView1() {
  if (event.target.id == "addJob") {
    return;
  } else {
    isAddOption.value = !isAddOption.value;
    isSearchOption.value = !isSearchOption.value;
    let otherBtn = document.getElementById("searchJob");
    event.target.classList.add(...activeBtnClass);
    otherBtn.classList.remove(...activeBtnClass);
  }
}

function ChangePageView2() {
  if (isSearchOption.value) {
    return;
  } else {
    isAddOption.value = !isAddOption.value;
    isSearchOption.value = !isSearchOption.value;
    let activeBtn = document.getElementById("searchJob");
    let otherBtn = document.getElementById("addJob");
    activeBtn.classList.add(...activeBtnClass);
    otherBtn.classList.remove(...activeBtnClass);
  }
}
</script>
<template>
  <div class="text-center">
    <button
      class="duration-300 mr-5 bg-accentDark hover:bg-accentLight px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded"
      @click="ChangePageView1()"
      id="addJob"
    >
      Add Job
    </button>
    <button
      class="duration-300 ml-5 bg-accentDark hover:bg-accentLight px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded"
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
