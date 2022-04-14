<template>
  <div class="relative cursor-pointer min-w-[415px] h-[100px] p-4 bg-white outline outline-[1px] outline-gray-200 rounded-xl
  flex items-center gap-3 select-none transition-shadow hover:shadow-md hover:shadow-slate-300
  dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">
      <div class="h-full aspect-square border-transparent rounded-full overflow-hidden">
          <img class="w-full h-full object-cover" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="profile img" />
      </div>
      <div class="flex flex-col gap-2">
          <span class="text-base font-semibold text-gray-900 dark:text-light-text">{{lastname}} {{firstname}}</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{email}}</span>
      </div>
      <div class="absolute right-6 flex items-center gap-2 dark:text-light-text">
        <span class="bg-emerald-500 h-2 block aspect-square rounded-full animate-pulse" />
        Online
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
