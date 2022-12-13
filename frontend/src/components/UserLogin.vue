<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";
const authStore = useAuthenticationStore();
const userInfo = ref('')
// reference material: https://www.youtube.com/watch?v=0QN74j3EyQc
// This is the function that will be used for actually logging in
const updateUser = () => {
  authStore.name = userInfo.value
  authStore.isAuthUser = true
  retfunc = authStore.UserLogin
  return { retfunc }
}
// This is strictly for testing purposes and seeing if values update or not
// was working before, idk what happened. Should work without @click event in template code
const updateUserDev = () => {
  authStore.name = userInfo.value
  authStore.isAuthUser = true
  retfunc = authStore.UserLoginDev

  return { retfunc }
}
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
          v-model = "userInfo"
          required
        />
      </div>
      <button
        type="submit"
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
        @click="updateUserDev"
      >
      <!-- @click event above is unnecessary, figure out how to make it work without it-->
        Sign in
      </button>
    </form>
  </div>
</template>