import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useAuthStore = defineStore({
  id: "authorization",
  state: () => ({
    isAuthUser: false,
    isAuthAdmin: false,
    username: " ",
    name: " ",
  }),

  actions: {
    AdminLogin(password) {
      fetch("http://localhost:3000/authAdmin", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then((data) => {
        if (data.status === 200) {
          nav("/");
          this.isAuthAdmin = true;
        } else {
          console.log(data);
          updateLoginAttempt(true);
          //add a message to the user
        }
      });

      console.log("Admin login method");
    },
    UserLogin() {
      fetch("http://localhost:3000/authUser", {
        method: "POST",
        body: JSON.stringify({
          username: this.name,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then((data) => {
        if (data.status === 200) {
          nav("/");
          this.isAuthUser = true;
        } else {
          console.log(data);
          updateLoginAttempt(true);
        }
      });
      console.log("User login");
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
