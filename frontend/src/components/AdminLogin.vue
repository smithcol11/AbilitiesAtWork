<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref, reactive } from "vue";
import TextBox from "./TextBox.vue";
import Button from "./Button.vue";
import errorBanner from "./ErrorBanner.vue";
import Label from "./Label.vue";
const auth = useAuthenticationStore();
const adminData = reactive({
  adminUser: "",
  adminPassword: "",
});
//const adminUser = reactive("");
//const adminPassword = reactive("");
const banner = reactive({
  display: {
    type: Boolean,
    default: false,
  },
  duration: 3,
  timeRemaining: {
    type: Number,
    default: 3,
  },
  timer: {
    type: Number,
    default: 3,
  },
});

const updateAdmin = async () => {
  auth.username = adminData.adminUser;
  let result = await auth.AdminLogin(adminData.adminPassword);
  if (!result) DisplayErrorBanner();
};

function DisplayErrorBanner() {
  clearInterval(banner.timer);
  banner.timeRemaining = banner.duration;
  banner.display = true;
  //create a timer to display banner
  banner.timer = setInterval(() => {
    banner.timeRemaining--;
    if (banner.timeRemaining <= 0) {
      clearInterval(banner.timer);
      banner.display = false;
    }
  }, 1000);
}

function ResetValues() {
  (adminData.adminUser = ""), (adminData.adminPassword = "");
}
</script>
<template>
  <div id="Admin Login">
    <Label class="dark:text-light" text="Administrator Login"></Label>
    <form class="w-full max-w-md" method="post" @submit.prevent>
      <div class="md:flex md:items-center mb-6 mt-2">
        <div class="md:w-1/4">
          <Label
            class="block mb-1 md:mb-0 pr-4 dark:text-light"
            position="right"
            text="Username"
          ></Label>
        </div>
        <div class="md:w-1/2">
          <TextBox
            class="dark:bg-darkGrayAccent dark:text-light dark:border-darkGray"
            type="username"
            name="username"
            id="username"
            placeholder="Enter username"
            v-model="adminData.adminUser"
            required
          >
          </TextBox>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6 mt-2">
        <div class="md:w-1/4">
          <Label
            class="block md:text-right mb-1 md:mb-0 pr-4 dark:text-light"
            position="middle"
            text="Password"
          ></Label>
        </div>
        <div class="md:w-1/2">
          <TextBox
            class="dark:bg-darkGrayAccent dark:text-light dark:border-darkGray"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            v-model="adminData.adminPassword"
            required
          >
          </TextBox>
        </div>
      </div>

      <div class="flex justify-center gap-1">
        <Button type="submit" text="Sign in" @click="updateAdmin()"> </Button>
        <div>
          <Button type="reset" text="Reset" @click="ResetValues()"> </Button>
        </div>
      </div>
    </form>

    <Transition>
      <div role="alert" class="mt-5">
        <div v-if="banner.display == true">
          <errorBanner
            topText="ERROR: Invalid data field!"
            bottomText="One or more data fields is missing or incorrect!"
          ></errorBanner>
        </div>
      </div>
    </Transition>
  </div>
</template>
