<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref } from "vue";

const auth = useAuthenticationStore();
const firstName = ref("");
const lastName = ref("");
const render = ref(false);
const sec = ref(3);

const updateUser = async () => {
  auth.firstName = firstName.value;
  auth.lastName = lastName.value;
  let result = await auth.UserLogin();
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
      <button
        type="reset"
        class="ml-1 duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
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
        First or last name incorrect.
      </div>
    </Transition>
  </div>
</template>
