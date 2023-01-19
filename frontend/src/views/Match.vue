<script>
import ClientInfo from '../components/ClientInfo.vue';
import FilterRow from '../components/FilterRow.vue';

export default {
  name: "App",
  components: {
    ClientInfo,
    FilterRow,
  },
};
</script>

<template>
  <div class="Match">
    <div class="p-4 bg-light">
      <div class="p-2">
        <div class="py-2">
          <div class="flex flex-row items-center pb-4">
            <div>Client Info: </div>
            <div class="px-20">
              <button type="submit"
                class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 my-1 font-bold text-base text-light hover:text-dark rounded"
                @click="">
                Search new client
              </button>
            </div>
          </div>
          <ClientInfo initials="ABC" preferences="stuff" industry="thing" hours="some" appliedJobs="most" />
        </div>
      </div>
      <FilterRow />
    </div>
  </div>
</template>

<style>

</style>