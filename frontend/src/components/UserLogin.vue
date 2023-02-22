<script setup>
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { ref, reactive } from "vue";
import TextBox from "./TextBox.vue";
import Button from "./Button.vue";
import errorBanner from "./ErrorBanner.vue";
import Label from "./Label.vue";
const auth = useAuthenticationStore();
const userData = reactive({
  firstName: "",
  lastName: "",
});
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

const updateUser = async () => {
  auth.firstName = userData.firstName;
  auth.lastName = userData.lastName;
  let result = await auth.UserLogin();
  if (!result) DisplayErrorBanner();
};
function ResetValues() {
  (userData.firstName = ""), (userData.lastName = "");
}
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
</script>

<template>
  <div id="User Login">
    <Label class="dark:text-light" text="User Login"></Label>
    <form class="w-full max-w-md" method="post" @submit.prevent>
      <div class="md:flex md:items-center mb-6 mt-2">
        <div class="md:w-1/4">
          <Label
            class="block md:text-right mb-1 md:mb-0 pr-4 dark:text-light"
            position="middle"
            text="First"
          ></Label>
        </div>
        <div class="md:w-1/2">
          <TextBox
            class="dark:bg-darkGrayAccent dark:text-light dark:border-darkGray"
            type="text"
            placeholder="Enter first name"
            v-model="userData.firstName"
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
            text="Last"
          ></Label>
        </div>
        <div class="md:w-1/2">
          <TextBox
            class="dark:bg-darkGrayAccent dark:text-light dark:border-darkGray"
            type="text"
            placeholder="Enter last name"
            v-model="userData.lastName"
            required
          >
          </TextBox>
        </div>
      </div>
      <div class="flex justify-center gap-1">
        <Button type="submit" text="Sign in" @click="updateUser()"> </Button>
        <Button type="reset" text="Reset" @click="ResetValues()"></Button>
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
