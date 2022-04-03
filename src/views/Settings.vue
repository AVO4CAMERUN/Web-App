<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col p-4 m-4 gap-4 w-[100%] h-[100%] items-center">

      <div class="flex flex-row justify-center p-4 w-[75%] h-[75%] items-center">

        <!-- Img -->
        <img
          v-if="imgProfile !== null"
          :src="`data:image/png;base64,${imgProfile}`"
          class="rounded-full w-[150px] h-[150px] cursor-pointer object-cover hover:ring-4 hover:ring-primary-light hover:scale-105 duration-500"
          alt="profile image" draggable="false"
        >
        <img v-else class="w-12 h-12 rounded-full object-cover" src="@/assets/user_placeholder.png" draggable="false">

        <!-- Name and username -->
        <div class="flex flex-col justify-left ml-10 gap-2">
          <span class="text-4xl"> {{firstname}} {{lastname}} </span>
          <span class="text-lg"> {{username}} </span>
        </div>

      </div>

      <hr class="border border-green-900 w-[70%]">

      <!-- Tabs -->
      <div class="flex flex-row w-[70%] p-8 gap-8 justify-left">
        <button
          class="py-2 px-4 w-[25%] rounded-t-lg rounded-r-lg bg-green-800 text-white hover:bg-green-900 hover:translate-x-2 duration-500"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selected = index"
        >
          {{tab}}
        </button>
      </div>

      <!-- Options -->
      <ProfileOptions v-if="selected === 0"/>
      <WebsiteOptions v-if="selected === 1"/>

    </div>
    <div id="google_translate_element"></div>
  </div>
</template>

<script>
import store from '@/store/index'
// import { accountService as as } from '@/servises/account.services'
import ProfileOptions from '@/components/Setting/ProfileOptions.vue'
import WebsiteOptions from '@/components/Setting/WebsiteOptions.vue'

export default {
  name: 'settings',
  data: function () {
    return {
      imgProfile: store.state.login.imgProfile,
      selected: 0,
      tabs: ['Informazioni Personali', 'Impostazioni Sito']
    }
  },
  components: { ProfileOptions, WebsiteOptions },
  mounted () {},
  methods: {},
  computed: {
    img () { return store.state.login.imgProfile },
    firstname () { return store.state.login.firstname },
    lastname () { return store.state.login.lastname },
    username () { return store.state.login.username },
    email () { return store.state.login.email }
  }
}
</script>
