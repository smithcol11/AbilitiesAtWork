<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
const auth = useAuthenticationStore();
</script>
<template>
  <div id="Admin Login" class="">
    <h2>Admin Login</h2>
    <form method="post" @submit.prevent>
      <div class="py-3">
        <label class="pr-5" for="email">Username</label>
        <input
          class="rounded border p-1"
          type="username"
          name="username"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          required
        />
      </div>
      <div class="py-3">
        <label class="pr-5" for="password">Password</label>
        <input
          class="rounded border p-1"
          type="password"
          name="password"
          id="{{auth.username}}"
          placeholder="Enter password"
          required
        />
      </div>
      <button
        type="submit"
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click="auth.AdminLoginDev"
      >
        Sign in
      </button>
    </form>
  </div>
</template>
