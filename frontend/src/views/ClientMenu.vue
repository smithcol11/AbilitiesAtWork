<script setup>
import AddClient from "../components/AddClient.vue";
</script>

<script setup>
import ClientAdd from "../components/AddClient.vue";
import SearchView from "../components/SearchClient.vue";
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
      class="duration-300 mr-5 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
      @click="toggleView('Add')"
      id="addClient"
    >
      Add Client
    </button>
    <button
      class="duration-300 ml-5 bg-light border-2 border-black shadow-sm hover:bg-accentDark px-4 py-1 my-5 text-base text-black hover:text-white rounded"
      @click="toggleView('Search')"
      id="searchClient"
    >
      Search Clients
    </button>
    <form>
      <div v-if="currentView === 'Search'">
        <SearchView />
      </div>
      <div v-else-if="currentView === 'Add'">
        <ClientAdd />
      </div>
    </form>
  </div>
</template>

<style></style>
