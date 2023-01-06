import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";

export const useAuthenticationStore = defineStore({
  id: "authorization",
  state: () => ({
    isAuthUser: false,
    isAuthAdmin: false,
    username: " ",
    firstName: " ",
    lastName: " ",
  }),

  actions: {
    AdminLogin(password) {
      fetch("http://localhost:3000/loginAdmin", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.auth) {
            this.isAuthAdmin = true;
            router.push("/");
          } else {
            return false;
          }
        });
    },
    UserLogin() {
      fetch("http://localhost:3000/loginUser", {
        method: "POST",
        body: JSON.stringify({
          username: this.firstName,
          password: this.lastName,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.auth) {
            this.isAuthUser = true;
            router.push("/");
          } else {
            return false;
          }
        });
    },
    Logout() {
      this.isAuthAdmin = false;
      this.isAuthUser = false;
    },
  },
  getters: {
    IsAuthorizedUser() {
      return this.isAuthUser;
    },
    IsAuthorizedAdmin() {
      return this.isAuthAdmin;
    },
  },
});
