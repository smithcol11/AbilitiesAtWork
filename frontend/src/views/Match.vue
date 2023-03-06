<script setup>
import ClientInfo from "../components/ClientInfo.vue";
import { reactive } from "vue";

let exampleClient = reactive({
  firstName: "First",
  middleInitial: "M",
  lastInitial: "L",
  preferences: "things",
  industry: "stuff",
  hours: "some",
});
</script>

<template>
  <div class="Match">
    <div class="p-4 bg-light">
      <div class="p-2 py-2 flex flex-row items-center">
        <div>
          <ClientInfo :client="exampleClient" />
        </div>
        <div class="px-20 self-start">
          <Button text="Search new client" @click=""/>
        </div>
      </div>
    </div>
  </div>
</template>
