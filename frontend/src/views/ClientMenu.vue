<script setup>
import ClientAdd from "../components/AddClient.vue";
import SearchTable from "../components/SearchTable.vue";
import { ref } from "vue";

const currentView = ref("Search");
const activeBtnClass = ["bg-accentLight", "text-dark"];

function toggleView(view) {
  currentView.value = view;
  let otherBtn = document.getElementById("searchClient");
  let otherBtn1 = document.getElementById("addClient");

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
      id="addClient"
    >
      Add Client
    </button>
    <button
      class="duration-300 mx-2 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
      @click="toggleView('Search')"
      id="searchClient"
    >
      Search Clients
    </button>
    <div>
      <div v-if="currentView === 'Search'">
        <SearchTable />
      </div>
      <div v-else-if="currentView === 'Add'" class="mx-auto max-w-lg">
        <ClientAdd />
      </div>
    </div>
  </div>
</template>

<style></style>
