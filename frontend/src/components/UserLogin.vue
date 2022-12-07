<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
const authStore = useAuthenticationStore();
</script>
<template>
  <div id="User Login" class="">
    <h2>User Login</h2>
    <form method="post" @submit.prevent>
      <div class="p-3">
        <label class="px-5" for="email">Name</label>
        <input
          class="rounded border p-1"
          type="username"
          name="username"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter first and last name"
          required
        />
      </div>
      <button
        type="submit"
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click="authStore.UserLoginDev"
      >
        Sign in
      </button>
    </form>
  </div>
</template>
