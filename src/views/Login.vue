<template>
  <div class="grid place-items-center bg-gradient-to-r from-[#3f87a6] to-[#63b377] h-[85vh]">
    <div class="">
        <a href="https://www.avo4camerun.kirinsecurity.com/">
            <div class="bg-slate-100 rounded-[5px] p-1 absolute left-10 top-10">
                <img src="home.png" class="bg-white rounded-full inline-block" alt="Avo4Camerun Logo" draggable="false">
                <p class="xl inline-block">
                    Back to home
                </p>
            </div>
        </a>
    </div>
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
            <BaseInputText name="Username" v-model="usernameIN" type="text" top @keyup.enter="login" />
            <BaseInputText name="Password" v-model="passwordIN" :type="type" bottom @keyup.enter="login" />
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
    <PopUp
      v-if="popupError"
      @noAction="this.popupError = !this.popupError"
      :type="'error'"
      :message="'Error'"
      :content="'Incorrect username or password'"
    />
  </div>
</template>

<script>
import BaseInputText from '@/components/Base/BaseInputText.vue'
import { mapGetters } from 'vuex'
import store from '@/store/index'
import PopUp from '@/components/Base/PopUp.vue'

export default {
  name: 'login',
  data: function () {
    return {
      usernameIN: '',
      passwordIN: '',
      checked: false,
      type: 'password',
      popupError: false
    }
  },
  computed: {
    ...mapGetters(['username', 'password'])
  },
  methods: {
    showPassword () {
      if (this.checked) this.type = 'password'
      else this.type = 'text'
    },
    login () {
      // change username and password in store
      store.commit('login/setUsername', { username: this.usernameIN })
      store.commit('login/setPassword', { password: this.passwordIN })

      // login request on store
      store.dispatch('login/login')
        .then((response) => {
          this.$router.push('/search')
          if (response) this.popupError = !this.popupError
        })
    }
  },
  components: {
    BaseInputText,
    PopUp
  }
}
</script>
