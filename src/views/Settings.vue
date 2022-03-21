<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col p-4 m-4 gap-4 w-[100%] h-[100%] items-center">

      <div class="flex flex-row justify-center p-4 w-[75%] h-[75%] items-center">

        <img :src="`data:image/png;base64,${imgProfile}`" class="rounded-full w-[150px] h-[150px] cursor-pointer object-cover
                        hover:ring-4 hover:ring-[#63b377] hover:scale-105 duration-500">

        <div class="flex flex-col justify-left ml-10 gap-2">
          <span class="text-4xl"> {{firstname}} {{lastname}} </span>
          <span class="text-lg"> {{username}} </span>
        </div>

      </div>

      <hr class="border border-green-900 w-[60%]">

      <div class="flex flex-row w-[70%] p-8 gap-8 justify-left">
        <button class="py-2 px-4 w-[25%] rounded-t-lg rounded-r-lg bg-green-800 text-white
                    hover:bg-green-900 hover:translate-x-2 duration-500"> Informazioni Personali </button>
      </div>

      <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">

        <div class="flex flex-col items-center gap-4">

          <fieldset class="py-2 px-4 rounded-lg w-[50%] border border-emerald-800">
            <legend>Name</legend>
            <span class="text-xl">{{firstname}}</span>
            <!-- <input type="text" class="w-full h-full" placeholder="New Name"> -->
          </fieldset>

          <fieldset class="py-2 px-4 rounded-lg w-[50%] border border-emerald-800">
            <legend>Surname</legend>
            <span class="text-xl">{{lastname}}</span>
            <!-- <input type="text" class="w-full h-full text-lg focus:outline-none" placeholder="New Surname"> -->
          </fieldset>

          <fieldset class="py-2 px-4 rounded-lg w-[50%] border border-emerald-800">
            <legend>Username</legend>
            <span class="text-xl">{{username}}</span>
            <!-- <input type="text" class="w-full h-full" placeholder="New Username"> -->
          </fieldset>

          <fieldset class="py-2 px-4 rounded-lg w-[50%] border border-emerald-800">
            <legend>Email-address</legend>
            <span class="text-xl">{{email}}</span>
            <!-- <input type="text" class="w-full h-full" placeholder="New Email-address"> -->
          </fieldset>

          <button class="py-4 px-8 rounded-lg bg-green-800 text-white w-[25%]
                      hover:bg-green-900"> Edit </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import SearchCard from '../components/Search/SearchCard.vue'
// import { coursesService as cs } from '../servises/course.services'
// import { mapState } from 'vuex'
import store from '@/store/index'

export default {
  name: 'settings',
  data: function () {
    return {
      imgProfile: store.state.login.imgProfile,
      options: [
        { name: '', placeholder: '' }
      ]
    }
  },
  components: {},
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
