<template>
  <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">

        <div class="flex flex-col items-left gap-4">

          <div v-for="(option, index) in options" :key="option.name" class="flex flex-row justify-between">
            <fieldset class="py-5 px-4 rounded-lg w-[50%] border border-emerald-800">
              <legend class="font-semibold">{{option.label}}</legend>
              <span v-if="!option.editable" class="w-full h-full text-lg">{{option.actualValue}}</span>
              <input v-else type="text" class="w-full h-full text-lg pb-[1px] focus:outline-none" :placeholder="option.actualValue" v-model="option.newValue">
            </fieldset>
            <div class="flex flex-row items-end gap-2 w-[45%] justify-end">
              <button
                class="py-4 px-4 rounded-lg bg-green-800 text-white w-[50%] h-[90%] hover:bg-green-900" :class="option.name === 'email' ? 'cursor-not-allowed': ''" :disabled="option.name === 'email' ? true : false"
                @click="!option.editable ? option.editable = !option.editable : setNew(index)"
              >
                {{!option.editable ? 'Edit' : 'Save Changes'}} {{}}
              </button>
              <button
                v-if="option.editable"
                class="py-4 px-4 rounded-lg bg-red-800 text-white w-[50%] h-[90%] hover:bg-red-900"
                @click="option.editable = !option.editable"
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
import {
  nameChecker,
  usernameChecker,
  emailChecker
} from '@/Utils/input_checker.util'
import { accountService as as } from '@/servises/account.services'

export default {
  name: 'settings',
  data: function () {
    return {
      options: [
        { name: 'firstname', label: 'Name', actualValue: store.state.login.firstname, newValue: '', checker: nameChecker, editable: false },
        { name: 'lastname', label: 'Surname', actualValue: store.state.login.lastname, newValue: '', checker: nameChecker, editable: false },
        { name: 'username', label: 'Username', actualValue: store.state.login.username, newValue: '', checker: usernameChecker, editable: false },
        { name: 'email', label: 'Email', actualValue: store.state.login.email, newValue: '', checker: emailChecker, editable: false }
      ]
    }
  },
  components: {},
  mounted () {},
  methods: {
    setNew (index) {
      const option = this.options[index]
      if (option.newValue === option.actualValue) return // new value and old value matches

      const valid = option.checker(option.newValue)
      if (!valid) return // new value is not valid

      const newData = {}
      newData[option.name] = option.newValue

      as.putAccount(newData)
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((json) => {
          store.commit('login/setUsername', { username: json.username })
          store.commit('login/setFirstname', { firstname: json.firstname })
          store.commit('login/setLastname', { lastname: json.lastname })
          // store.commit('login/SetEmail', { email: json.email })
        })
      option.editable = !option.editable
    }
  },
  computed: {
    img () { return store.state.login.imgProfile },
    firstname () { return store.state.login.firstname },
    lastname () { return store.state.login.lastname },
    username () { return store.state.login.username },
    email () { return store.state.login.email }
  },
  watch: {
    img () { return store.state.login.imgProfile },
    firstname () { this.options[0].actualValue = store.state.login.firstname },
    lastname () { this.options[1].actualValue = store.state.login.lastname },
    username () { this.options[2].actualValue = store.state.login.username },
    email () { this.options[3].actualValue = store.state.login.email }
  }
}
</script>
