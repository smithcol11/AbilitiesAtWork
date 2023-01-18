import { defineStore } from "pinia";
import { ref, watch } from "vue";
import router from "../router";

export const useAuthenticationStore = defineStore("authorization", () => {
  const isAuthUser = ref(false);
  const isAuthAdmin = ref(false);
  const username = ref("");
  const firstName = ref("");
  const lastName = ref("");

  validateJWT();

  if (localStorage.getItem("firstName") == true) {
    firstName.value = localStorage.getItem("firstName");
    lastName.value = localStorage.getItem("lastName");
  }

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
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("lastName", lastName.value);
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

  async function validateJWT() {
    await fetch("http://localhost:3000/verifyJWT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.admin) {
          isAuthAdmin.value = true;
          router.push("/");
        } else if (data.auth) {
          isAuthUser.value = true;
          router.push("/");
        }
      });
  }

  function Logout() {
    isAuthAdmin.value = false;
    isAuthUser.value = false;
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    document.cookie = "token=;Max-Age=-1";
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
    validateJWT,
  };
});
