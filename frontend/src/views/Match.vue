<script>
import ClientInfo from "../components/ClientInfo.vue";
import SearchTable from "../components/SearchTable.vue";


export default {
    name: "App",
    components: {
      ClientInfo,
      SearchTable,
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
    
   
    methods: {
      async getClient() {
        
        try {
          //const baseURL = 'http://localhost:3000/getAllClients?JAR'
          const baseURL = 'http://localhost:3000/matchClient?ABC'
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
          <button
          type="submit"
          id="getClientButton"
          class="simple-button"
          @click="getClient()">
            Search new client
          </button>
        </div>
      </div>
      
    </div>
    <div class="text-center">
    <SearchTable />
  </div>

  </div>
</template>

<style></style>
