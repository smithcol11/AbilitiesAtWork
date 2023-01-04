<script setup>
import { useAuthStore } from "../stores/Authentication";
import AddClientScreen from "../components/AddClient.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();
const JobOption = ref(0);
</script>

<template>
  <div
    class="mx-auto text-2xl rounded w-2/3 max-w-xl h-100 bg-light p-5 shadow-lg text-center border"
  >
    <h1>Client Menu</h1>
    <div class="pt-6 text-lg">
      <p>Please select from the following options:</p>
    </div>
    <div class="grid grid-cols-1 mx-auto w-40">
      <RouterLink to="/AddClient" class="menuButton"> Add Client </RouterLink>
      <RouterLink to="/RemoveClient" class="menuButton"> Remove Client </RouterLink>
      <RouterLink to="/EditClient" class="menuButton"> Edit Client </RouterLink>
      <RouterLink to="/ViewAllClients" class="menuButton">
        View All Clients
      </RouterLink>
    </div>
  </div>
</template>

