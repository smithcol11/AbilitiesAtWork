<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";

const auth = useAuthenticationStore();
const adminUser = ref("");
const adminPassword = ref("");
// Actual login function for the admin account(s)
const updateAdmin = () => {
  auth.username = adminUser;
  let result = auth.AdminLogin(adminPassword.value);
};
</script>
<template>
  <div id="Admin Login" class="">
    <h2>Administrator Login</h2>
    <form method="post" @submit.prevent>
      <div class="py-3">
        <label class="pr-5" for="username">Username</label>
        <input
          class="rounded border p-1"
          type="username"
          name="username"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          v-model="adminUser"
          required
        />
      </div>
      <div class="py-3">
        <label class="pr-5" for="password">Password</label>
        <input
          class="rounded border p-1"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          v-model="adminPassword"
          required
        />
      </div>
      <button
        type="submit"
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click="updateAdmin"
      >
        Sign in
      </button>
    </form>
  </div>
</template>
