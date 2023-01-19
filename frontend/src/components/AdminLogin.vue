<script setup></script>
<template>
  <div id="Admin Login" class="">
    <h2>Admin Login</h2>
    <form method="post" @submit.prevent>
      <div class="py-3">
        <label class="pr-5" for="email">Username</label>
        <input
          class="rounded border p-1"
          type="username"
          name="username"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          required
        />
      </div>
      <div class="py-3">
        <label class="pr-5" for="password">Password</label>
        <input
          class="rounded border p-1"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
        />
      </div>
      <button
        type="submit"
        class="simple-button"
        @click=""
      >
        Sign in
      </button>
    </form>
  </div>
</template>
