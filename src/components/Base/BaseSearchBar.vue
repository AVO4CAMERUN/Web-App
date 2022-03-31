<template>
  <div class="p-3">
    <div class="flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <input
          type="text"
          v-model="inputSearch"
          class="h-14 w-96 pr-8 pl-5 rounded-lg z-0 focus:shadow focus:outline-none dark:bg-gray-700 dark:caret-white dark:shadow-gray-700"
          placeholder="Search anything..."
        >
        <i class='absolute top-1/2 -translate-y-[45%] right-3 dark:text-gray-100 bx bx-search icon'></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSearchBar',
  data: function () {
    return {
      inputSearch: ''
    }
  },
  watch: {
    inputSearch (newValue) {
      this.$emit('inputSearch', newValue)
    }
  }
}
</script>
