<script setup>
import { reactive, ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const success = ref(false)
const visible = ref(false)

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

var client_initials = reactive({
  initials: "",
});

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

</script>

<template>
  <div v-if="banner.success == true" class="p-5 rounded bg-green-400 max-w-xl">
    <h1 class="text-green-700 text-center">
      <b>{{client_initials.initials}}</b>
    </h1>
  </div>
  <form method="post" ref="clientForm" @submit.prevent>
    <div class="px-1 sm:px-1 max-w-xl py-5 w-full">
      <div class="mx-auto rounded w-full h-1/2 bg-light p-5 text-left shadow-lg border">
        <div>
          <label class="block px-1 py-1">Initials</label>
          <input class="rounded border px-1 py-1 sm:w-3/4 w-full" type="text" name="initials" id="initials"
            placeholder="Enter initials" v-model="client_initials.initials" required />
        </div>
        <button
          class="duration-300 bg-accentDark hover:bg-accentLight px-4 py-1 mt-5 mr-3 font-bold text-base text-light hover:text-dark rounded"
          @click="submitForm">
          Search client
        </button>
      </div>
    </div>
  </form>
</template>

<!-- <script>
export default {
  data() {
    return {
      initials: client_initials.initials
    }
  },
}
</script> -->