<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";

const authStore = useAuthenticationStore();
const firstName = ref("");
const lastName = ref("");
// reference material: https://www.youtube.com/watch?v=0QN74j3EyQc
// This is the function that will be used for actually logging in
const updateUser = () => {
  authStore.firstName = firstName;
  authStore.lastName = lastName;
  let result = authStore.UserLogin();
};
</script>
<template>
  <div id="User Login" class="">
    <h2>User Login</h2>
    <form method="post" @submit.prevent>
      <div class="py-3">
        <label class="pr-5" for="email">First</label>
        <input
          class="rounded border p-1"
          type="username"
          name="username"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter first name"
          v-model="firstName"
          required
        />
      </div>
      <div class="py-3">
        <label class="pr-5" for="password">Last</label>
        <input
          class="rounded border p-1"
          type="text"
          name="password"
          id="password"
          placeholder="Enter last name"
          v-model="lastName"
          required
        />
      </div>
      <button
        type="submit"
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click="updateUser"
      >
        Sign in
      </button>
    </form>
  </div>
</template>
