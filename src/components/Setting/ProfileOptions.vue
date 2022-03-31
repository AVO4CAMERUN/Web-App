<template>
  <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">

        <div class="flex flex-col items-center gap-4">

          <div v-for="(option, index) in options" :key="option.name">
            <fieldset class="py-2 px-4 rounded-lg w-[50%] border border-emerald-800">
              <legend>{{option.label}}</legend>
              <span v-if="!editable" class="text-xl">{{option.actualValue}}</span>
              <input v-else type="text" class="w-full h-full text-lg focus:outline-none" :placeholder="option.actualValue" v-model="option.newValue">
            </fieldset>
            <button
                class="py-4 px-8 rounded-lg bg-green-800 text-white w-[25%] hover:bg-green-900"
                @click="!editable ? editable = !editable : setNew(index)"
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
      editable: false,
      options: [
        { name: 'firstname', label: 'Name', actualValue: store.state.login.firstname, newValue: '', checker: nameChecker },
        { name: 'lastname', label: 'Surname', actualValue: store.state.login.lastname, newValue: '', checker: nameChecker },
        { name: 'username', label: 'Username', actualValue: store.state.login.username, newValue: '', checker: usernameChecker },
        { name: 'email', label: 'Email', actualValue: store.state.login.email, newValue: '', checker: emailChecker }
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

      as.putAccount(newData, store.state.login.accessToken)
        .then((response) => {
          // if (response.status === 200) return response.json()
          // add response json and update store
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
