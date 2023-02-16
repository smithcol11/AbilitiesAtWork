<script setup>
import SearchTable from "../components/SearchTable.vue";
import { ref } from "vue";
import CreateJob from "../components/CreateJob.vue";
import ModifyLists from "../components/ModifyLists.vue"

const currentView = ref("Search");
const activeBtnClass = ["bg-accentLight", "text-dark"];

function toggleView(view) {
  currentView.value = view;
  let otherBtn = document.getElementById("searchJob");
  let otherBtn1 = document.getElementById("addJob");

  if (view === "Add") {
    otherBtn1.classList.add(...activeBtnClass);
    otherBtn.classList.remove(...activeBtnClass);
  } else if (view === "Search") {
    otherBtn.classList.add(...activeBtnClass);
    otherBtn1.classList.remove(...activeBtnClass);
  }
}
</script>
<template>
  <div class="text-center">
    <button
      class="duration-300 mx-2 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
      @click="toggleView('Add')"
      id="addJob"
    >
      Add Job
    </button>
    <button
      class="duration-300 mx-2 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
      @click="toggleView('Search')"
      id="searchJob"
    >
      Search Jobs
    </button>
    <button
      class="duration-300 mx-2 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
      @click="toggleView('Modify')"
      id="modiftList"
    >
      Modify Lists
    </button>
    <form>
      <div v-if="currentView === 'Search'">
        <SearchTable />
      </div>
      <div v-else-if="currentView === 'Add'" class="mx-auto max-w-xl">
        <CreateJob />
      </div>
      <div v-else-if="currentView === 'Modify'" class="mx-auto max-w-xl">
        <ModifyLists/>
      </div>
    </form>
  </div>
</template>

<style></style>
