<template>
  <div class="CreateJob">
    <!-- <h1>This is the Create Job page </h1> -->
    <span>Business Name: </span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    />
    <span>Contact Name:</span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    /><br>
    <span>Position:</span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    />
    <span>Contact info:</span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    /><br>

    <span>Industry:</span>
    <input
      type="radio"
      v-model="industry"
      value="Cafe"
    />
    <label>Cafe</label>
    <input
      type="radio"
      v-model="industry"
      value="Retail"
    />
    <label>Retail</label>
    <input
      type="radio"
      v-model="industry"
      value="Food"
    />
    <label>Food</label>
    <input
      type="radio"
      v-model="industry"
      value="Janitorial"
    />
    <label>Janitorial</label>
    <button class="btn">Add Industry</button><br>

    <span>Hours:</span>
    <input
      type="radio"
      v-model="hours"
      value="Full-Time"
    />
    <label>Full-Time</label>
    <input
      type="radio"
      v-model="hours"
      value="Part-Time"
    />
    <label>Part-Time</label>
    <input
      type="radio"
      v-model="hours"
      value="Both"
    />
    <label>Both</label><br>

    <span>Shift(s):</span>
    <input
      type="radio"
      v-model="shift"
      value="Morning"
    />
    <label>Morning</label>
    <input
      type="radio"
      v-model="shift"
      value="Afternoon"
    />
    <label>Afternoon</label>
    <input
      type="radio"
      v-model="shift"
      value="Night"
    />
    <label>Night</label><br>

    <span>Country:</span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    />
    <span>Address</span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    /><br>

    <span>Date Posted</span>
    <input
      v-model="name"
      type="text"
      placeholder=""
    /><br>

    <span>Notes:</span><br>
    <textarea>
      v-model="name"
      type="text"
      placeholder=""
    </textarea><br>

    <br>
    <button class="btn">SUBMIT</button>
  </div>
  
  
</template>

<script>

</script>

<style>

  input {
    padding: auto;
    margin: 4px;
    border-bottom: 0em;
  }
  .btn {
    background: rgb(206, 87, 198);
    color: #fff;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
  }

  input{
    border: 1px solid purple;
  }

  textarea {
    border: 1px solid purple;
  }
</style>
