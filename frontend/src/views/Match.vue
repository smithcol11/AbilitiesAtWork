<script>
import ClientInfo from "../components/ClientInfo.vue";
import FilterRow from "../components/FilterRow.vue";

export default {
  name: "App",
  components: {
    ClientInfo,
    FilterRow,
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
      exampleFilters: [
        {
          title: "Organization: ",
          options: ["Option A", "Option B", "Option Q", "Option Z"],
        },
        {
          title: "Position: ",
          options: ["Option C", "Option D", "Option V", "Option Y", "Option R"],
        },
        {
          title: "Shift: ",
          options: ["Option E", "Option F", "Option J"],
        },
        {
          title: "County: ",
          options: ["Option G", "Option H", "Option M", "Option E"],
        },
        {
          title: "Contact: ",
          options: ["Option I", "Option P"],
        },
      ],
    };
  },
};
</script>

<template>
  <div class="Match">
    <div class="p-4 bg-light">
      <div class="p-2 py-2 flex flex-row items-center">
        <div>
          <div class="pb-2">Client Info:</div>
          <ClientInfo :client="exampleClient" />
        </div>
        <div class="px-20 self-start">
          <button type="submit" class="simple-button" @click="">
            Search new client
          </button>
        </div>
      </div>
      <FilterRow :filters="exampleFilters" />
    </div>
  </div>
</template>

<style></style>
