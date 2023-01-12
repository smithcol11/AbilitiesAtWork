import { defineStore } from "pinia";
import { ref, watch } from "vue";
import router from "../router";

export const useAuthenticationStore = defineStore("authorization", () => {
  const isAuthUser = ref(false);
  const isAuthAdmin = ref(false);
  const username = ref("");
  const firstName = ref("");
  const lastName = ref("");

  if (localStorage.getItem("authAdmin") == "true") {
    isAuthAdmin.value = true;
  }

  if (localStorage.getItem("authUser") == "true") {
    isAuthUser.value = true;
    firstName.value = localStorage.getItem("firstName");
    lastName.value = localStorage.getItem("lastName");
  }

  watch(isAuthAdmin, () => {
    localStorage.setItem("authAdmin", isAuthAdmin.value);
  });

  watch(isAuthUser, () => {
    localStorage.setItem("authUser", isAuthUser.value);
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("lastName", lastName.value);
  });

  async function AdminLogin(password) {
    await fetch("http://localhost:3000/loginAdmin", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          isAuthAdmin.value = true;
          router.push("/");
        }
      });
    return isAuthAdmin.value;
  }

  async function UserLogin() {
    await fetch("http://localhost:3000/loginUser", {
      method: "POST",
      body: JSON.stringify({
        username: firstName.value,
        password: lastName.value,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          isAuthUser.value = true;
          router.push("/");
        }
      });
    return isAuthUser.value;
  }

  function Logout() {
    isAuthAdmin.value = false;
    isAuthUser.value = false;
  }

  return {
    isAuthAdmin,
    isAuthUser,
    username,
    firstName,
    lastName,
    AdminLogin,
    UserLogin,
    Logout,
  };
});
