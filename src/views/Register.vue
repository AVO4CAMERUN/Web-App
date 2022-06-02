<template>
  <div class="flex justify-center items-center place-items-center bg-gradient-to-r from-[#3f87a6] to-[#63b377] h-screen">
    <div
      class="flex items-center justify-center w-[110] h-[600px] p-8 rounded-[18px] bg-slate-100 shadow-lg shadow-gray-700"
      :class="{'opacity-[.15]': popupEmailConfirm || popupError}"
    >
      <div class="max-w-md w-full">
        <div>
          <img src="../assets/logo_esteso_2.png" alt="Avo4Camerun Logo" draggable="false" />
        </div>
        <div class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <BaseInputText name="Name" v-model="this.inputs[0].value" :type="this.inputs[0].type" :disabled="popupEmailConfirm || popupError" top @keyup.enter="register" />
            <BaseInputText name="Surname" v-model="this.inputs[1].value" :type="this.inputs[1].type" :disabled="popupEmailConfirm || popupError" @keyup.enter="register" />
            <BaseInputText name="Username" v-model="this.inputs[2].value" :type="this.inputs[2].type" :disabled="popupEmailConfirm || popupError" @keyup.enter="register" />
            <BaseInputText name="Email" v-model="this.inputs[3].value" :type="this.inputs[3].type" :disabled="popupEmailConfirm || popupError" @keyup.enter="register" />
            <BaseInputText name="Password" v-model="this.inputs[4].value" :type="this.inputs[4].type" :disabled="popupEmailConfirm || popupError" @keyup.enter="register" />
            <BaseInputText name="Confirm Password" v-model="this.inputs[5].value" :type="this.inputs[5].type" :disabled="popupEmailConfirm || popupError" bottom @keyup.enter="register" />
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

          <div class="flex items-center justify-between">
            <div class="text-sm">
              Have already an account?
              <router-link to="/login" class="font-medium text-green-700 hover:text-green-600 hover:underline">
                Sign-in
              </router-link>
            </div>
            <div>
              <a href="https://www.avo4camerun.kirinsecurity.com/">
                <i class="bx bxs-home text-lg mr-2" alt="home"></i>
                <p class="inline-block">
                    Back to home
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Email Confirm PopUp -->
    <PopUp
      v-if="popupEmailConfirm"
      :type="'success'"
      :message="'Activate your account'"
      :content="'Check your email to confirm your account'"
      @doAction="this.$router.push('/login')"
    />
    <!-- Error PopUp -->
    <PopUp
      v-if="popupError"
      :type="'error'"
      :message="'Error'"
      :content="errorMessage"
      @noAction="this.popupError = !this.popupError"
    />
  </div>
</template>

<script>
import BaseInputText from '@/components/Base/BaseInputText.vue'
import PopUp from '@/components/Base/PopUp.vue'
import { accountService as as } from '@/servises/account.services'
import {
  nameChecker,
  usernameChecker,
  emailChecker,
  passwordChecker
} from '@/Utils/input_checker.util'
// import store from '../store/index'

export default {
  name: 'register',
  data: function () {
    return {
      checked: false,
      popupEmailConfirm: false,
      popupError: false,
      errorMessage: '',
      nameIN: '',
      surnameIN: '',
      usernameIN: '',
      emailIN: '',
      passwordIN: '',
      inputs: [
        { name: 'name', value: '', placeholder: 'Name', type: 'text', disabled: false, error: true, errorText: 'Name can contain only letters and spaces' },
        { name: 'surname', value: '', placeholder: 'Surname', type: 'text', disabled: false, error: true, errorText: 'Surname can contain only letters and spaces' },
        { name: 'username', value: '', placeholder: 'Username', type: 'text', disabled: false, error: true, errorText: 'Username can contain only lower case letters, numbers and . - _' },
        { name: 'email', value: '', placeholder: 'Email', type: 'text', disabled: false, error: true, errorText: 'Email not valid' },
        { name: 'password', value: '', placeholder: 'Password', type: 'password', disabled: false, error: true, errorText: 'Password must be at least 8 characters and contains at least one number, one special character, one upper case and one lower case letter' },
        { name: 'confirm_password', value: '', placeholder: 'Confirm Password', type: 'password', disabled: false, error: true, errorText: 'Password don\'t match' }
      ]
    }
  },
  computed: {
  },
  methods: {
    showPassword () {
      if (this.checked) {
        this.inputs[4].type = 'password'
        this.inputs[5].type = 'password'
      } else {
        this.inputs[4].type = 'text'
        this.inputs[5].type = 'text'
      }
    },
    // Methods for checker user input
    checker () {
      this.inputs[0].error = nameChecker(this.inputs[0].value)
      this.inputs[1].error = nameChecker(this.inputs[1].value)
      this.inputs[2].error = usernameChecker(this.inputs[2].value)
      this.inputs[3].error = emailChecker(this.inputs[3].value)
      if (this.inputs[4].value === this.inputs[5].value) {
        this.inputs[4].error = passwordChecker(this.inputs[4].value)
      } else {
        this.inputs[5].error = false
      }
    },
    // Methods on submit
    register () {
      this.checker() // Checking inputs
      let sum = 0
      this.errorMessage = ''
      for (const input of this.inputs) {
        sum += input.error // sum for check
        if (!input.error) {
          this.errorMessage = input?.errorText
          break
        }
      }

      // Check all user input
      if (sum === 6) {
        const obj = {
          firstname: this.inputs[0].value,
          lastname: this.inputs[1].value,
          username: this.inputs[2].value,
          email: this.inputs[3].value,
          password: this.inputs[4].value
        }
        as.createAccount(obj)
          .then(() => { this.popupEmailConfirm = !this.popupEmailConfirm })
      } else {
        this.popupError = !this.popupError
      }
    }
  },
  components: {
    BaseInputText,
    PopUp
  }
}
// @click=""
</script>
