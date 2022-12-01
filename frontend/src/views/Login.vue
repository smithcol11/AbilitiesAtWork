<script setup>
import { useAuthStore } from "../stores/Authentication";
import AdminLogin from "../components/AdminLogin.vue";
import UserLogin from "../components/UserLogin.vue";
import { ref } from "vue";
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const name = ref("");
let loginTypeButtonString = "Employee Login";
const isAdmin = ref(false);

function IsValidLogin() {
  if (this.isAdmin) this.IsValidAdminLogin();
  else this.IsValidEmployeeLogin();
}
function IsValidAdminLogin() {
  console.log("submitted admin login!");
}
function IsValidEmployeeLogin() {
  console.log("Submitted employee login!");
}
function ChangeLoginType() {
  if (this.isAdmin) this.loginTypeButtonString = "Admin Login";
  else this.loginTypeButtonString = "Employee Login";
  this.isAdmin = !this.isAdmin;
}
</script>

<template>
  <div class="px-1 sm:px-10 max-w-xl py-6 mx-auto items-center justify-between">
    
    <div class="justify-center mx-auto rounded w-full h-1/2 bg-light p-1 sm:p-5 text-center shadow-lg border">
      <img src="../assets/images/logo.png" class="text-center justify-center mx-auto object-contain w-3/4">
      <!--onsubmit="return false", prevents page from reloading when a button is pressed -->
      <form onsubmit="return false">
        <div v-if="isAdmin">
          <AdminLogin />
        </div>
        <div v-else>
          <UserLogin />
        </div>  
      </form>
      <button class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded" @click="ChangeLoginType()">Change Login Type</button>
    </div>
  </div>
</template>



