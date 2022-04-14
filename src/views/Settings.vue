<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col p-4 m-4 gap-4 w-[100%] h-[100%] items-center">

      <div class="flex flex-row justify-center p-4 w-[75%] h-[75%] items-center">

        <!-- Img -->
        <div class="rounded-full group cursor-pointer relative">
          <div class="rounded-full h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
            <p class="font-semibold text-white text-xl dark:text-white">
              <i class="fa-solid fa-image"></i>
            </p>
          </div>
          <img
            v-if="imgStore !== null && imgStore !== ''"
            :src="`data:image/png;base64,${imgStore}`"
            class="rounded-full w-[150px] h-[150px] cursor-pointer object-cover group-hover:ring-4 group-hover:ring-primary-light duration-500"
            alt="profile image"
            draggable="false"
          >
          <img v-else
            class="w-12 h-12 rounded-full object-cover group-hover:opacity-40 duration-200"
            src="@/assets/user_placeholder.png"
            draggable="false"
          >
          <input type="file" @change="setImage" class="absolute inset-0 cursor-pointer opacity-0">
        </div>

        <!-- Name and username -->
        <div class="flex flex-col justify-left ml-10 gap-2">
          <span class="text-4xl dark:text-white"> {{firstname}} {{lastname}} </span>
          <span class="text-lg dark:text-white"> {{username}} </span>
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
import { accountService as as } from '@/servises/account.services'
import ProfileOptions from '@/components/Setting/ProfileOptions.vue'
import WebsiteOptions from '@/components/Setting/WebsiteOptions.vue'

export default {
  name: 'settings',
  data: function () {
    return {
      imgCover: '',
      selected: 0,
      tabs: ['Informazioni Personali', 'Impostazioni Sito']
    }
  },
  components: { ProfileOptions, WebsiteOptions },
  mounted () {},
  methods: {
    setImage (e) {
      // Convert image cover to Base64 and set preview
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const tmp = e.target.result.split(',')
        this.imgCover = tmp[1]

        const obj = { img_profile: this.imgCover }
        as.putAccount(obj)
          .then((response) => {
            if (response.status === 200) return response.json()
          })
          .then((json) => {
            if (json) store.commit('login/setImgProfile', { img_profile: json.img_profile })
          })
      }
      reader.readAsDataURL(files[0])
    }
  },
  computed: {
    imgStore () { return store.state.login.imgProfile },
    firstname () { return store.state.login.firstname },
    lastname () { return store.state.login.lastname },
    username () { return store.state.login.username },
    email () { return store.state.login.email }
  }
}
</script>
