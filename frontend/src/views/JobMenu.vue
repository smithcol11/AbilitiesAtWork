<script setup>
import SearchTable from "../components/SearchTable.vue";
import { ref } from "vue";
import CreateJob from "../components/CreateJob.vue";
import Button from "../components/Button.vue";
const currentView = ref("Search");
const activeBtnClass = ["accentLight-button"];

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
    <div class="flex justify-center gap-10 my-5">
      <Button @click="toggleView('Add')" id="addJob" text="Add Job"> </Button>
      <Button
        class="accentLight-button"
        @click="toggleView('Search')"
        id="searchJob"
        text="Search Jobs"
      >
      </Button>
    </div>
    <form>
      <div v-if="currentView === 'Search'">
        <SearchTable />
      </div>
      <div v-else-if="currentView === 'Add'" class="mx-auto max-w-xl">
        <CreateJob />
      </div>
    </form>
  </div>
</template>

<style></style>
