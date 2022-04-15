<template>
  <!-- Main -->
  <div class="text-center p-5 border w-96 shadow-lg rounded-md bg-white self-center drop-shadow-2xl">
      <!-- Header -->
      <span>
        <!-- Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full" :class="type === 'error' ? 'bg-red-100' : type === 'confirm' ? 'bg-yellow-100' : 'bg-green-100' ">
          <svg v-if="type === 'error'" class="h-6 w-6 text-red-600" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
          <svg v-else-if="type === 'success'" class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else-if="type === 'confirm'" class="h-6 w-6" fill="orange" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>
          </svg>
        </div>
        <!-- Message -->
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{message}}</h3>
      </span>
      <!-- Content -->
      <div class="mt-2 px-7 py-3">
        <p class="text-sm text-gray-500">
          {{content}}
        </p>
      </div>
      <!-- Buttons -->
      <div class="flex flex-row-reverse gap-2 items-center px-4 py-3">
        <!-- No Action / Remove Error -->
        <button v-if="type === 'error' || type === 'confirm'"
          class="px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2"
          :class="type === 'error' ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300' : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300'"
          @click="this.$emit('noAction')"
        >
        {{type === 'confirm' ? 'No' : 'Ok'}}
        </button>
        <!-- Do Action / Remove Error -->
        <button v-if="type === 'success' || type === 'confirm'"
          class="px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2"
          :class="type === 'success' ? 'bg-green-500 hover:bg-green-600 focus:ring-green-300' : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300'"
          @click="this.$emit('doAction')"
        >
        {{type === 'confirm' ? 'Yes' : 'Continue'}}
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  data: function () {
    return {}
  },
  props: {
    type: String,
    color: String,
    message: String,
    content: String
  }
}
</script>

<style>
</style>
