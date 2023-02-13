<script>
import ClientInfo from "../components/ClientInfo.vue";

export default {
  name: "App",
  components: {
    ClientInfo,
  },
  data() {
    return {
      exampleClient: {
        initials: "ABC",
        preferences: "things",
        industry: "stuff",
        hours: "some",
        appliedJobs: "many",
      },
    };
  },
};
</script>

<template>
  <div class="Match">
    <div class="p-4 bg-light">
      <div class="p-2 py-2 flex flex-row items-center">
        <div>
          <ClientInfo :client="exampleClient" />
        </div>
        <div class="px-20 self-start">
          <button type="submit" class="simple-button px-4 py-1 my-1" @click="">
            Search new client
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
