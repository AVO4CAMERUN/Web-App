<template>
  <div class="flex justify-center items-center place-items-center bg-gradient-to-r from-[#3f87a6] to-[#63b377] h-[100vh]">
    <div class="flex items-center justify-center w-[110] h-[600px] p-8 rounded-[18px] bg-slate-100 shadow-lg shadow-gray-700 "
    :class="{'opacity-[.15]': popupEmailConfirm}"
    >
      <div class="max-w-md w-full">
        <div>
          <img src="../assets/logo_esteso-min.png" alt="Avo4Camerun Logo" draggable="false" />
        </div>
        <div class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <BaseInputText name="Name" v-model="name" type="text" :disabled="popupEmailConfirm" top />
            <BaseInputText name="Surname" v-model="surname" type="text" :disabled="popupEmailConfirm" />
            <BaseInputText name="Username" v-model="username" type="text" :disabled="popupEmailConfirm" />
            <BaseInputText name="Email" v-model="email" type="text" :disabled="popupEmailConfirm" />
            <BaseInputText name="Password" v-model="password" :type="type" :disabled="popupEmailConfirm" />
            <BaseInputText name="Password" v-model="confirmPassword" :type="type" :disabled="popupEmailConfirm" bottom />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-green-500 border-gray-300 rounded"
                v-model="checked"
                @click="showPassword"
                :disabled="popupEmailConfirm"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Show Password
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent
                text-sm font-medium rounded-full text-white bg-green-600
                hover:bg-green-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-green-500"
              @click="register"
              :disabled="popupEmailConfirm"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-green-500 group-hover:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>

          <div class="flex items-center justify-center">
            <div class="text-sm">
              Have already an account?
              <router-link to="/login" class="font-medium text-green-700 hover:text-green-600 hover:underline">
                Sign-in
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
    class="text-center p-5 border w-96 shadow-lg rounded-md bg-white fixed self-center drop-shadow-2xl"
    v-if="popupEmailConfirm"
    >
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Activate your account</h3>
      <div class="mt-2 px-7 py-3">
        <p class="text-sm text-gray-500">Check your email to confirm your account</p>
      </div>
      <div class="items-center px-4 py-3">
        <button
          class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          @click="this.$router.push('/login')"
        >OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/Base/BaseInputText.vue'
import { accountService as as } from '@/servises/account.services'
// import store from '../store/index'

export default {
  name: 'register',
  data: function () {
    return {
      name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      checked: false,
      type: 'password',
      popupEmailConfirm: false,
      popups: [false, false, false, false, false]
    }
  },
  computed: {},
  methods: {
    showPassword () {
      if (this.checked) this.type = 'password'
      else this.type = 'text'
    },
    // Match text with regex and return true or false
    generalChecker (text, pattern) {
      return new RegExp(pattern).test(text)
      /* const regex = new RegExp(pattern)
      return regex.test(text) */
    },
    // Methods for checker user input
    checker () {
      // name surname username email password generalpopup
      this.popups[0] = this.generalChecker(this.name, '^[a-zA-Z]+$')
      this.popups[1] = this.generalChecker(this.surname, '^[a-zA-Z]+$')
      this.popups[2] = this.generalChecker(this.username, '^[a-z0-9_.-]{3,20}$')
      this.popups[3] = this.generalChecker(this.email, '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

      if (this.password === this.confirmPassword) {
        this.popups[4] = this.generalChecker(this.password, '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')
      }
    },
    // Methods on submit
    register () {
      this.checker() // call input checker
      let sum = 0; this.popups.forEach(popup => { sum += popup }) // sum for check

      // Check all user input
      console.log(sum)
      if (sum === 5) {
        as.createAccount(this.name, this.surname, this.email, this.username, this.password)
          .then((response) => { this.popupEmailConfirm = !this.popupEmailConfirm })
      } else {
        // fare pop up err
        // this.popupEmailConfirm = !this.popupEmailConfirm
      }
    }
  },
  components: {
    BaseInputText
  }
}
// @click=""
</script>
