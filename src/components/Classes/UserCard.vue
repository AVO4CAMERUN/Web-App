<template>
  <div class="flex flex-row justify-between min-w-[415px] max-w-[740px] h-[100px] p-4 bg-white outline outline-[1px] outline-gray-200 rounded-xl cursor-pointer
              hover:shadow-md hover:shadow-slate-300 transition-shadow
              dark:shadow-slate-700 dark:ouline-gray-700 dark:bg-slate-900">

    <div class="flex flex-row gap-4">
      <!-- ProfileImage -->
      <div class="h-full aspect-square border-transparent rounded-full overflow-hidden">
        <img src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Profile Image" class="w-full h-full object-cover" draggable="false">
      </div>

      <!-- FirstName, LastName & Email -->
      <div class="flex flex-col justify-center gap-2">
        <span class="text-base font-semibold text-gray-900 dark:text-light-text">{{lastname}} {{firstname}}</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{email}}</span>
      </div>
    </div>

    <div class="flex flex-row items-center justify-center gap-2 dark:text-light-text">
      <!-- Status -->
      <span class="h-2 block bg-emerald-500 aspect-square rounded-full animate-pulse"/>
      <span class="text-sm">Online</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  data: function () {
    return {}
  },
  props: {
    email: String,
    firstname: String,
    lastname: String,
    role: String,
    img: String,
    registrationDate: String
  },
  methods: {},
  components: {},
  mounted () {}
}
</script>

<style>
</style>
