<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col p-4 m-4 gap-4 w-[100%] h-[100%] items-center">

      <div class="flex flex-row justify-center p-4 w-[75%] h-[75%] items-center">

        <!-- Img -->
        <img :src="`data:image/png;base64,${imgProfile}`" class="rounded-full w-[150px] h-[150px] cursor-pointer object-cover hover:ring-4 hover:ring-primary-light hover:scale-105 duration-500">

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
        >
          {{tab}}
        </button>
      </div>

      <!-- Options -->
      <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">

        <div class="flex flex-col items-center gap-4">

          <fieldset
            class="py-2 px-4 rounded-lg w-[50%] border border-emerald-800"
            v-for="option in options"
            :key="option.name"
          >
            <legend>{{option.label}}</legend>
            <span v-if="!editable" class="text-xl">{{option.actualValue}}</span>
            <input v-else type="text" class="w-full h-full text-lg focus:outline-none" :placeholder="option.actualValue" v-model="option.newValue">
          </fieldset>

          <button
            class="py-4 px-8 rounded-lg bg-green-800 text-white w-[25%] hover:bg-green-900"
            @click="!editable ? editable = !editable : setNew()"
          >
          {{!editable ? 'Edit' : 'Save Changes'}}
          </button>
          <button
            v-if="editable"
            class="py-4 px-8 rounded-lg bg-red-800 text-white w-[25%] hover:bg-red-900"
            @click="editable = !editable"
          >
          Discard Changes
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { accountService as as } from '@/servises/account.services'
import { checkers } from '@/Utils/input_checker.util'

export default {
  name: 'settings',
  data: function () {
    return {
      imgProfile: store.state.login.imgProfile,
      editable: false,
      tabs: ['Informazioni Personali', 'Impostazioni Sito'],
      options: [
        { name: 'firstname', label: 'Name', actualValue: store.state.login.firstname, newValue: '' },
        { name: 'lastname', label: 'Surname', actualValue: store.state.login.lastname, newValue: '' },
        { name: 'username', label: 'Username', actualValue: store.state.login.username, newValue: '' },
        { name: 'email', label: 'Email', actualValue: store.state.login.email, newValue: '' }
      ]
    }
  },
  components: {},
  mounted () {},
  methods: {
    setNew () {
      // fare i controlli sull'input
      console.log(checkers)
      const filter = { firstname: 'Pablo', lastname: 'Escobar' }
      // inserire key-value come option.name-option.newValue
      as.putAccount(filter, store.state.login.accessToken)
        .then((response) => {
          if (response.status === 200) return response.json()
          // add response json and update store
        })
        .then((newData) => {
          console.log(newData)
        })
    }
  },
  computed: {
    img () { return store.state.login.imgProfile },
    firstname () { return store.state.login.firstname },
    lastname () { return store.state.login.lastname },
    username () { return store.state.login.username },
    email () { return store.state.login.email }
  }
}
</script>
