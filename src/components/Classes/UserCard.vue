<template>
  <div class="relative cursor-pointer w-full min-w-[415px] h-[100px] bg-white p-4 outline outline-[1px] outline-gray-200 rounded-xl flex justify-between items-center select-none transition-shadow hover:shadow-md hover:shadow-slate-300">
      <div class="h-full aspect-square border-transparent rounded-full overflow-hidden">
          <img class="w-full h-full object-cover" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="profile img" />
      </div>
      <div class="flex flex-col gap-2">
          <span class="text-base font-semibold text-gray-900">{{lastname}} {{firstname}}</span>
          <span class="text-sm font-normal text-gray-500">{{email}}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="bg-green-400 h-2 block aspect-square rounded-full" />
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
