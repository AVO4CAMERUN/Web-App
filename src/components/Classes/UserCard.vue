<template>
  <div class="flex flex-row justify-between min-w-[415px] max-w-[740px] h-[100px] p-4 bg-white outline outline-[1px] outline-gray-200 rounded-xl cursor-pointer
              hover:shadow-md hover:shadow-slate-300 transition-shadow
              dark:shadow-slate-700 dark:ouline-gray-700 dark:bg-slate-900">

    <div class="flex flex-row gap-8">
      <!-- ProfileImage -->
      <div class="h-full aspect-square border-transparent rounded-full overflow-hidden">
        <img v-if="img" :src="`data:image/png;base64,${img}`" alt="Profile Image" class="w-full h-full object-cover" draggable="false">
        <img v-else src="@/assets/user_placeholder.png" alt="Profile Image" class="w-full h-full object-cover" draggable="false">
      </div>
      <!-- FirstName, LastName & Email -->
      <div class="flex flex-col justify-center gap-2">
        <span class="text-base font-semibold text-gray-900 dark:text-light-text notranslate">{{lastname}} {{firstname}} <i v-if="email === storeEmail" class="fa-solid fa-user"></i></span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 notranslate">{{email}}</span>
      </div>
    </div>

    <!-- Status -->
    <!-- <div class="flex flex-row items-center justify-center gap-2 dark:text-light-text">
      <span class="h-2 block bg-emerald-500 aspect-square rounded-full animate-pulse"/>
      <span class="text-sm">Online</span>
    </div> -->

    <!-- Remove User -->
    <div v-if="remove" class="w-[28px] h-[28px] aspect-square rounded-full m-1 hover:scale-125 transition self-center">
      <i @click="this.$emit('email', email)" class="fa-solid fa-circle-xmark cursor-pointer text-[28px] text-red-900 bg-transparent" />
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'UserCard',
  data: function () {
    return {}
  },
  props: ['email', 'firstname', 'lastname', 'role', 'img', 'registrationDate', 'remove'],
  methods: {},
  components: {},
  mounted () {},
  computed: {
    storeEmail () { return store.state.login.email }
  }
}
</script>

<style>
</style>
