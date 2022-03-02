<template>
  <div class="grid place-items-center bg-gradient-to-r from-[#3f87a6] to-[#63b377] h-[100vh]">
    <div
    class="flex items-center justify-center w-[110] h-[450px] p-8 rounded-[18px] bg-slate-100 shadow-lg shadow-gray-700"
    :class="{'opacity-[.15]': popupError}"
    >
      <div class="max-w-md w-full">
        <div>
          <img src="../assets/logo_esteso.png" alt="Avo4Camerun Logo" draggable="false" />
        </div>
        <div class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <BaseInputText name="Username" v-model="username" type="text" top />
            <BaseInputText name="Password" v-model="password" :type="type" bottom />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                class="h-4 w-4 text-indigo-600 focus:ring-green-500 border-gray-300 rounded"
                type="checkbox"
                v-model="checked"
                @click="showPassword"
              />
              <label class="ml-2 block text-sm text-gray-900" for="remember-me">
                Show Password
              </label>
            </div>
            <!-- <div class="text-sm">
              <a
                href="#"
                class="font-medium text-red-600 hover:text-green-500 hover:underline"
              > Forgot your password?
              </a>
            </div> -->
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full
              text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              @click="login"
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
              </span> Sign in
            </button>
          </div>
          <div class="flex items-center justify-center">
            <div class="text-sm"> Not a member?
              <router-link to="/register" class="font-medium text-green-700 hover:text-green-600 hover:underline">
                Sign-up
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
    class="text-center p-5 border w-96 shadow-lg rounded-md bg-white fixed self-center drop-shadow-2xl"
    v-if="popupError"
    >
        <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg class="h-6 w-6 text-red-600" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Warning!</h3>
            <div class="mt-2 px-7 py-3">
                <p class="text-sm text-gray-500">
                    Error login
                </p>
            </div>
            <div class="items-center px-4 py-3">
                <button
                  class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  @click="popupError = !popupError"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { loginService as ls } from '@/servises/login.services'
import store from '@/store/index'
import BaseInputText from '@/components/Base/BaseInputText.vue'

export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: '',
      checked: false,
      type: 'password',
      popupError: false
    }
  },
  computed: {},
  methods: {
    showPassword () {
      if (this.checked) {
        this.type = 'password'
      } else {
        this.type = 'text'
      }
    },
    login () {
      ls.login(this.username, this.password)
        .then((response) => {
          // Save a refreshToken and accessToken
          if (response.status === 200) {
            return response.json()
          } else {
            this.popupError = !this.popupError
          }
        }).then((obj) => {
          const { refreshToken, accessToken } = obj
          localStorage.setItem('refreshToken', refreshToken)
          localStorage.setItem('accessToken', accessToken)
          // Extract data on jwt
          const { email, role, username } = JSON.parse(atob(accessToken.split('.')[1]))
          // Save data user on local storage
          localStorage.setItem('email', email)
          localStorage.setItem('role', role)
          localStorage.setItem('username', username)
          // Change router
          store.commit('changeLogin')
          this.$router.push('/search')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  components: {
    BaseInputText
  }
}
// @click=""
</script>
