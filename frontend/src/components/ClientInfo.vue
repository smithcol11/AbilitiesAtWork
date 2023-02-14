<template>
  <div class="font-bold pb-2"> Matches for {{ client.firstName }} {{ client.middleInitial }}. {{ client.lastInitial }}. </div>
  <div class="text-sm">
    <div><span class="font-extralight italic">Preferences: </span>
       {{ client.preferences }} 
    </div>
    <div><span class="font-extralight italic">Industry: </span>
       {{ client.industry }} 
    </div>
    <div><span class="font-extralight italic">Hours: </span>
       {{ client.hours }} 
    </div>
  </div> 
</template>

<script>
export default {
  props: {
    client: Object,
  }
};
</script>