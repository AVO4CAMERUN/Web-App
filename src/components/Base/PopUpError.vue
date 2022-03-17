<template>
  <div
    class="text-center p-5 border w-96 shadow-lg rounded-md bg-white fixed self-center drop-shadow-2xl"
  >
    <div class="mt-3 text-center">
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
        <svg class="h-6 w-6 text-red-600" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
        </svg>
      </div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Warning!</h3>
      <div class="mt-2 px-7 py-3">
        <p class="text-sm text-gray-500">
          {{errorText}}
        </p>
      </div>
      <div class="items-center px-4 py-3">
        <button
          class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          @click="this.$emit('removeError')"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data: function () {
    return {}
  },
  props: {
    errorText: String
  }
}
</script>

<style>
</style>
