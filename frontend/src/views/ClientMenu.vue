<script setup>
import ClientAdd from "../components/AddClient.vue";
import SearchClient from "../components/ClientTable.vue";
import SearchTable from "../components/SearchTable.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import { useAuthenticationStore } from "../stores/AuthenticationStore.js";

const currentView = ref("Search");
const auth = useAuthenticationStore(); //use auth store for authorizing admin-only capabilities
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

//authorize action by validating the JWT and checking the isAdmin value after validation
const authorizeAddClient = () => auth.validateJWT() && auth.isAuthAdmin;
</script>
<template>
  <div class="text-center">
    <div class="flex justify-center gap-10 my-5">
      <Button
        v-if="authorizeAddClient() == true"
        @click="toggleView('Add')"
        id="addClient"
        text="Add Client"
      />
      <Button
        class="accentLight-button"
        @click="toggleView('Search')"
        id="searchClient"
        text="Search Clients"
      />
    </div>
    <div>
      <div v-if="currentView === 'Search'">
        <SearchClient />
      </div>
      <div v-else-if="currentView === 'Add'" class="mx-auto max-w-lg">
        <ClientAdd />
      </div>
    </div>
  </div>
</template>
