<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <img class="mx-auto h-12 w-auto" src="../assets/logo.png" alt="Avo4Camerun Logo">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                LOGIN
            </h2>
        </div>
        <div class="mt-8 space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label class="sr-only">Email address</label>
                    <input
                        type="email" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        v-model="email"
                    >
                </div>
                <div>
                    <label class="sr-only">Password</label>
                    <input
                        type="password" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        v-model="password"
                    >
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    >
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                        Show password
                    </label>
                </div>

                <div class="text-sm">
                    <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Not a member? Sign-up
                    </router-link>
                </div>
            </div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <!-- Heroicon name: solid/lock-closed -->
                    <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                Sign in
            </button>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    /* publishedBooksMessage() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    } */
  },
  methods: {
    submit () {}
  },
  components: {}
}
// @click=""
</script>
