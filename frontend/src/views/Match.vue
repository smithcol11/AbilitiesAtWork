<script>
import ClientInfo from "../components/ClientInfo.vue";
import SearchTable from "../components/SearchTable.vue";
import { reactive, ref, computed, onBeforeMount } from "vue";
import SearchNewClient from "../components/SearchNewClient.vue";
import { required } from "@vuelidate/validators";
const success = ref(false)
const visible = ref(false)
import { useVuelidate } from "@vuelidate/core";

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

const client_initials = ref("");

const rules = computed(() => {
  return {
    initials: { required },
  };
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
const v$ = useVuelidate(rules, client_initials);

const submitForm = async () => {
  // check that the data matches requirements
  const result = await v$.value.$validate();
  if (result) {
    displaySuccess();
  } else {
    displayError();
  }
};


export default {
    name: "App",
    components: {
      ClientInfo,
      SearchTable,
      SearchNewClient,
    },
    data() {
      return {
        exampleClient: {
          initials: null,
          preferences: "things",
          industry: "stuff",
          hours: "some",
          appliedJobs: "many",
        },
      };
    },
    
   
    methods: {
      async getClient() {
        
        try {
          //console.log(SearchNewClient.client_initials.initials)
          
          //console.log(this.$options.components['searchNewClient'].options.data().initial)
          //const baseURL = 'http://localhost:3000/getAllClients?JAR'
          const baseURL = 'http://localhost:3000/matchClient?re'
          const res = await fetch(baseURL, { method: 'GET'})          
          //const res = await fetch(baseURL, { method: 'POST', body: JSON.stringify({ initials: 'JAR'})})          
          //const data = await res.json()
          console.log('get successful')
          //console.log(res)
        } catch (error) {
          console.log('get failed')
        }
      }
    }  
};

async function getClient() {
  await fetch("http://localhost:3000/getClient", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      initials: data.initials,
      hours: hourString[parseInt(data.hours)],
      industry: data.industry,
    }),
  })
    .then((response) => console.log(response))
    .then((data) => {
      responseBody = data;
      console.log(responseBody);
    })
    .catch((errors) => console.log(errors));
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
          <!-- <button
          type="submit"
          id="getClientButton"
          class="simple-button"
          @click="getClient()">
            Search new client
          </button> -->
          <form>
            <div
          @click="getClient()">
              <form method="post" ref="clientForm" @submit.prevent>
                <div class="px-1 sm:px-1 max-w-xl py-5 w-full">
                  <div class="mx-auto rounded w-full h-1/2 bg-light p-5 text-left shadow-lg border">
                    <div>
                      <label class="block px-1 py-1">Initials</label>
                      <input class="rounded border px-1 py-1 sm:w-3/4 w-full" type="text" name="initials" id="initials"
                        placeholder="Enter initials" />
                    </div>
                    <button
                      class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 mr-3 font-bold text-base text-light hover:text-dark rounded"
                      @click="submitForm">
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
