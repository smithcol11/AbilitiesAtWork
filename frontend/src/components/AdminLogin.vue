<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";

const auth = useAuthenticationStore();
const adminUser = ref("");
const adminPassword = ref("");
const render = ref(false);
const sec = ref(3);

const updateAdmin = async () => {
  auth.username = adminUser.value;
  let result = await auth.AdminLogin(adminPassword.value);
  if (!result) errorMessage();
};

function errorMessage() {
  render.value = true;
  let timer = setInterval(() => {
    sec.value--;
    if (sec.value <= 0) {
      sec.value = 3;
      clearInterval(timer);
      render.value = false;
    }
  }, 1000);
}
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
        class="simple-button px-4 py-1 my-1"
        @click="updateAdmin"
      >
        Sign in
      </button>
      <button
        type="reset"
        class="ml-1 simple-button px-4 py-1 my-1"
      >
        Reset
      </button>
    </form>
    <Transition>
      <div
        v-if="render"
        class="w-full max-w-md animate-bounce bg-rose-100 rounded-lg mt-10 px-6 py-6 mb-4 text-base"
        role="alert"
      >
        Username or password incorrect.
      </div>
    </Transition>
  </div>
</template>
<!-- yamhill, mult, clackamas, wash -->
