<script>
import ClientInfo from "../components/ClientInfo.vue";
import Button from "../components/Button.vue";
export default {
  name: "App",
  components: {
    ClientInfo,
    Button,
  },
  data() {
    return {
      exampleClient: {
        firstName: "First",
        middleInitial: "M",
        lastInitial: "L",
        preferences: "things",
        industry: "stuff",
        hours: "some",
      },
    };
  },
};
</script>

<template>
  <div class="Match">
    <div class="p-4 bg-light dark:bg-darkGray">
      <div class="p-2 py-2 flex flex-row items-center dark:bg-darkGrayAccent">
        <div>
          <ClientInfo :client="exampleClient" />
        </div>
      </div>
      <div class="px-20 text-center self-start">
          <Button text="Search new client" @click=""></Button>
      </div>
    </div>
  </div>
</template>

<style></style>
