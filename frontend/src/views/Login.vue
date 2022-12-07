<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import AdminLogin from "../components/AdminLogin.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthenticationStore();
const isAdmin = ref(false);
function ChangeLoginType() {
  isAdmin.value = !isAdmin.value;
}
</script>

<template>
  <div class="px-1 sm:px-10 max-w-xl py-5 mx-auto">
    <div
      class="mx-auto rounded w-full h-1/2 bg-light p-5 text-center shadow-lg border"
    >
      <img
        src="../assets/images/logo.png"
        class="text-center mx-auto object-contain w-3/4"
      />
      <!--onsubmit="return false", prevents page from reloading when a button is pressed -->
      <button
        class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-5 font-bold text-base text-light hover:text-dark rounded"
        @click="ChangeLoginType()"
      >
        Change Login Type
      </button>
      <form>
        <div v-if="isAdmin">
          <AdminLogin />
        </div>
        <div v-else>
          <UserLogin />
        </div>
      </form>
    </div>
  </div>
  <div>
    <p>isAuthAdmin: {{ auth.isAuthAdmin }}</p>
    <p>isAuthUser: {{ auth.isAuthUser }}</p>
    <p>username: {{ auth.username }}</p>
    <p>name: {{ auth.name }}</p>
  </div>
</template>
