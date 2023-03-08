<script setup>
import ClientInfo from "../components/ClientInfo.vue";
import SearchTable from "../components/SearchTable.vue";
import { reactive, ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import successBanner from "../components/SuccessBanner.vue";
import errorBanner from "../components/ErrorBanner.vue";

const success = ref(false);
const visible = ref(false);

const banner = reactive({
  displaySuccess: {
    type: Boolean,
    default: false,
  },
  displayFailed: {
    type: Boolean,
    default: false,
  },
  duration: 4,
  timeRemaining: {
    type: Number,
    default: 4,
  },
  timer: {
    type: Number,
    default: 4,
  },
});

function DisplayBanner(bannerType) {
  if (bannerType == "success") banner.displaySuccess = true;
  else banner.displayFailed = true;

  clearInterval(banner.timer);
  banner.timeRemaining = banner.duration;

  //create a timer to display banner
  banner.timer = setInterval(() => {
    banner.timeRemaining--;
    if (banner.timeRemaining <= 0) {
      clearInterval(banner.timer);
      banner.displaySuccess = false;
      banner.displayFailed = false;
    }
  }, 1000);
}

const clientInfo = reactive({
  firstName: "",
  middleInitial: "",
  lastInitial: "",
  preferences: "",
  industry: "",
  hours: "",
  appliedJobs: "",
});

const rules = computed(() => {
  return {};
});

const bannerText = ref("");

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

const allMatchedJobs = ref([]);

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

async function matchClient() {
  allMatchedJobs.value = [];
  await fetch("http://localhost:3000/getMatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      firstName: clientInfo.firstName,
      middleInitial: clientInfo.middleInitial,
      lastInitial: clientInfo.lastInitial,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error == "No Client Found") {
        bannerText.value = "No client exists for given name.";
        DisplayBanner("error");
      } else if (data.length < 1) {
        bannerText.value = "No matches for given client.";
        DisplayBanner("error");
      } else {
        allMatchedJobs.value = data;
        bannerText.value = "Check table below for matches.";
        DisplayBanner("success");
      }
    })
    .catch((errors) => {
      console.log(errors);
      DisplayBanner("error");
    });
}
</script>

<template>
  <div class="Match">
    <div class="">
      <div class="px-4 flex flex-row items-center">
        <div class="self-start">
          <form>
            <div>
              <Transition>
                <div role="alert">
                  <div v-if="banner.displaySuccess == true">
                    <successBanner
                      topText="Client Found!"
                      :bottomText="bannerText"
                    />
                  </div>
                  <div v-if="banner.displayFailed == true">
                    <errorBanner
                      topText="ERROR: No client matches found!"
                      :bottomText="bannerText"
                    />
                  </div>
                </div>
              </Transition>
              <form method="post" ref="clientForm" @submit.prevent>
                <div class="px-1 sm:px-1 max-w-md pt-4 w-full">
                  <div
                    class="mx-auto rounded w-full h-1/2 bg-light dark:bg-darkGray p-5 text-left shadow-lg border dark:border-darkGrayAccent"
                  >
                    <div>
                      <label class="block px-1 py-1 mb-2"
                        >Enter Client's Name</label
                      >
                      <input
                        class="rounded border p-2 px-1 py-1 w-full mb-2 dark:bg-darkGrayAccent dark:focus:bg-darkGray dark:border-darkGray"
                        type="text"
                        name="initials"
                        id="initials"
                        placeholder="First Name"
                        v-model="clientInfo.firstName"
                        style="margin-right: 1rem"
                      />
                      <input
                        class="rounded border px-1 py-1 w-1/2 mb-2 dark:bg-darkGrayAccent dark:focus:bg-darkGray dark:border-darkGray"
                        type="text"
                        name="initials"
                        id="initials"
                        placeholder="Middle initial"
                        v-model="clientInfo.middleInitial"
                      />
                      <input
                        class="rounded border px-1 py-1 w-1/2 dark:bg-darkGrayAccent dark:focus:bg-darkGray dark:border-darkGray"
                        type="text"
                        name="initials"
                        id="initials"
                        placeholder="Last Initial"
                        v-model="clientInfo.lastInitial"
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
    <div v class="text-center">
      <SearchTable :key="allMatchedJobs" :job-matches="allMatchedJobs" />
    </div>
  </div>
</template>
