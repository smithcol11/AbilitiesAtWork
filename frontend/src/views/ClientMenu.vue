<script setup>
import ClientAdd from "../components/AddClient.vue";
import SearchTable from "../components/SearchTable.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";

const currentView = ref("Search");
const activeBtnClass = ["accentLight-button"];

function toggleView(view) {
  currentView.value = view;
  let btn = document.getElementById("searchClient");
  let btn1 = document.getElementById("addClient");

  if (view === "Add") {
    btn1.classList.add(...activeBtnClass);
    btn.classList.remove(...activeBtnClass);
  } else if (view === "Search") {
    btn.classList.add(...activeBtnClass);
    btn1.classList.remove(...activeBtnClass);
  }
}
</script>
<template>
  <div class="text-center">
    <div class="flex justify-center gap-10 my-5">
      <Button @click="toggleView('Add')" id="addClient" text="Add Client" />
      <Button
        class="accentLight-button"
        @click="toggleView('Search')"
        id="searchClient"
        text="Search Clients"
      />
    </div>
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
