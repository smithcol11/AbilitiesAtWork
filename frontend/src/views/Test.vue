
<template>
    <div class="Test">
      <h1>This is the test page</h1>
      
        <button @click="storeCounter.IncreaseCount"> click</button>
    </div>
  </template>
  <script>
  import {useCounterStore} from '../stores/counter'
  const storeCounter = useCounterStore()
 
  </script>
  <style></style>