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
  <!--onsubmit="return false", prevents page from reloading when a button is pressed -->
  <form onsubmit="return false">
    <div v-if="isAdmin">
      <AdminLogin />
    </div>
    <div v-else>
      <UserLogin />
    </div>
    <button @click="IsValidLogin()">Sign in</button>
  </form>
  <button @click="ChangeLoginType()">Change Login Type</button>
  <p>isAdmin: {{ isAdmin }}</p>
</template>
