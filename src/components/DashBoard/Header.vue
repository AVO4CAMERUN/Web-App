<template>
  <nav class="py-2.5 bg-white dark:bg-dark-sidebar">
    <div class="flex flex-row-reverse w-full px-6">
      <div class="flex flex-row-reverse">
        <button type="button"
          class="flex mt-2 bg-gray-800 rounded-full cursor-pointer focus:ring-4 focus:ring-gray-300">
          <img
            v-if="imgProfile !== null"
            class="w-12 h-12 rounded-full object-cover"
            :src="`data:image/png;base64,${imgProfile}`"
            draggable="false"
          >
          <img v-else class="w-12 h-12 rounded-full object-cover" src="@/assets/user_placeholder.png" draggable="false">
        </button>

        <svg class="rounded-full p-2 mt-3 mr-10 cursor-pointer duration-500 dark:fill-white hover:bg-primary-light"
          xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"
        >
          <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"/>
        </svg>
        <svg class="rounded-full p-2 mt-3 mr-10 cursor-pointer duration-500 dark:fill-white hover:bg-primary-light"
          xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"
        >
          <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"/>
          <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"/>
        </svg>
      </div>
    </div>
  </nav>
</template>

<script>
// import store from '@/store/index'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data: function () {
    return {
      // imgProfile: store.state.login.imgProfile
    }
  },
  computed: {
    ...mapState(
      'login', ['imgProfile']
    )
  },
  methods: {}
}
</script>

<style>
</style>
