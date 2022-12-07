import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";
/*
export const useAuthenticationStore = defineStore("AuthenticationStore", () => {
  const isAuthUser = ref(false);
  const isAuthAdmin = ref(false);
  const username = ref("");
  const name = ref("");

  function Test() {
    console.log("this is a test from the store!");
  }
  function AdminLogin(password) {
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
  }

  function UserLogin() {
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
  }

  return { isAuthUser, isAuthAdmin, username, name };
});*/

export const useAuthenticationStore = defineStore({
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
    UserLoginDev() {
      this.isAuthUser = !this.isAuthUser;
      console.log("UserLoginDev func call");
    },
    AdminLoginDev() {
      this.isAuthAdmin = !this.isAuthAdmin;
      console.log("AdminLoginDev func call");
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
