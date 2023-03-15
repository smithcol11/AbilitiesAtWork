<script setup>
import AdminLogin from "../components/AdminLogin.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
import {useDark, useToggle} from "@vueuse/core";

const isDark = useDark();

const isAdmin = ref(false);

function ChangeLoginType() {
  isAdmin.value = !isAdmin.value;
}
</script>

<template>
  <div class="px-1 sm:px-10 max-w-xl py-5 mx-auto">
    <div
      class="mx-auto rounded w-full h-1/2 bg-light dark:bg-darkGrayAccent p-5 text-center shadow-lg border dark:border-darkGrayAccent" 
    >
      <img
        src="../assets/images/logo.png"
        class="text-center mx-auto object-contain w-3/4"
      />
      <!--onsubmit="return false", prevents page from reloading when a button is pressed -->
      <div class="my-5">
        <Button text="Change Login Type" @click="ChangeLoginType()" />
      </div>
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
</template>
