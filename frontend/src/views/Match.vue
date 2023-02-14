<script setup>
import ClientInfo from "../components/ClientInfo.vue";
import SearchTable from "../components/SearchTable.vue";
import { reactive, ref, computed, onBeforeMount } from "vue";
import SearchNewClient from "../components/SearchNewClient.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const success = ref(false);
const visible = ref(false);

const banner = reactive({
  success: {
    type: Boolean,
    default: false,
  },
  failure: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const clientInfo = reactive({
  firstName: "",
  middleInitial: "",
  lastInitial: "",
});

const rules = computed(() => {
  return {};
});

// display success banner if post succeeded
const displaySuccess = () => {
  banner.success = true;
  setTimeout(() => {
    banner.success = false;
  }, 3000);
};

// display error banner if post failed
const displayError = () => {
  banner.failure = true;
  setTimeout(() => {
    banner.failure = false;
  }, 3000);
};

// use the rules the data must follow
const v$ = useVuelidate(rules, clientInfo);

const submitForm = async () => {
  // check that the data matches requirements
  const result = await v$.value.$validate();
  if (result) {
    displaySuccess();
    matchClient();
  } else {
    displayError();
  }
};

let exampleClient = {
  initials: "name",
  preferences: "things",
  industry: "stuff",
  hours: "some",
  appliedJobs: "many",
};

async function matchClient() {
  await fetch("http://localhost:3000/matchClient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      firstName: clientInfo.firstName,
      middleInitial: clientInfo.middleInitial,
      lastInitial: clientInfo.lastInitial,
    }),
  })
    .then((response) => console.log(response))
    .then((data) => {
      let responseBody = data;
      console.log(responseBody);
    })
    .catch((errors) => console.log(errors));
}
</script>

<template>
  <div class="Match">
    <div class="p-4 bg-light">
      <div class="p-2 py-2 flex flex-row items-center">
        <div>
          <ClientInfo :client="exampleClient" />
        </div>
        <div class="px-20 self-start">
          <!-- <button
          type="submit"
          id="getClientButton"
          class="simple-button"
          @click="getClient()">
            Search new client
          </button> -->
          <form>
            <div>
              <form method="post" ref="clientForm" @submit.prevent>
                <div class="px-1 sm:px-1 max-w-xl py-5 w-full">
                  <div
                    class="mx-auto rounded w-full h-1/2 bg-light p-5 text-left shadow-lg border"
                  >
                    <div>
                      <label class="block px-1 py-1">Initials</label>
                      <input
                        class="rounded border px-1 py-1 sm:w-3/4 w-full"
                        type="text"
                        name="initials"
                        id="initials"
                        placeholder="Enter initials"
                        v-model="clientInfo.firstName"
                      />
                    </div>
                    <button
                      class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 mr-3 font-bold text-base text-light hover:text-dark rounded"
                      @click="submitForm()"
                    >
                      Search client
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="text-center">
      <SearchTable />
    </div>
  </div>
</template>

<style></style>
