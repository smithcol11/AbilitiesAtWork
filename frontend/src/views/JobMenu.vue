<script setup>
import SearchTable from "../components/SearchTable.vue";
import { ref } from "vue";
import CreateJob from "../components/CreateJob.vue";
import Button from "../components/Button.vue";
import ModifyLists from "../components/ModifyLists.vue";

const currentView = ref("Search");
const activeBtnClass = ["accentLight-button"];

function toggleView(view) {
  currentView.value = view;
  let btn = document.getElementById("searchJob");
  let btn1 = document.getElementById("addJob");
  let btn2 = document.getElementById("modifyList");

  if (view === "Add") {
    btn1.classList.add(...activeBtnClass);
    btn.classList.remove(...activeBtnClass);
    btn2.classList.remove(...activeBtnClass);
  } else if (view === "Search") {
    btn.classList.add(...activeBtnClass);
    btn1.classList.remove(...activeBtnClass);
    btn2.classList.remove(...activeBtnClass);
  } else if (view === "Modify") {
    btn2.classList.add(...activeBtnClass);
    btn1.classList.remove(...activeBtnClass);
    btn.classList.remove(...activeBtnClass);
  }
}
</script>
<template>
  <div class="text-center">
    <div class="flex justify-center gap-5 md:gap-10 lg:gap-10 my-5">
      <Button class="ml-4" @click="toggleView('Add')" id="addJob" text="Add Job"> </Button>
      <Button
        class="accentLight-button"
        @click="toggleView('Search')"
        id="searchJob"
        text="Search Jobs"
      >
      </Button>
      <Button class="mr-4"
        @click="toggleView('Modify')"
        id="modifyList"
        text="Modify Lists"
      />
    </div>
    <form>
      <div v-if="currentView === 'Search'">
        <SearchTable />
      </div>
      <div v-else-if="currentView === 'Add'" class="mx-auto max-w-xl">
        <CreateJob />
      </div>
      <div v-else-if="currentView === 'Modify'" class="mx-auto max-w-xl">
        <ModifyLists />
      </div>
    </form>
  </div>
</template>

<style></style>
