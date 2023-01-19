<template>
  <div class="font-bold"> {{ client.initials }} </div>
  <div class="text-sm">
    <div>Preferences: {{ client.preferences }} </div>
    <div>Industry: {{ client.industry }} </div>
    <div>Hours: {{ client.hours }} </div>
    <div>Applied Jobs: {{ client.appliedJobs }} </div>
  </div> 
</template>

<script>
export default {
  props: {
    client: Object,
  }
};
</script>