<template>
  <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">
    <div class="flex flex-row justify-center gap-4">

      <!-- Change Theme -->
      <label>Change Theme</label>
      <i class="fa-solid aspect-square rounded-full text-[32px] cursor-pointer" @click="changeTheme" :class="darkTheme ? 'fa-sun text-amber-400' : 'fa-moon text-blue-800'" />
    </div>

    <!-- Change Language -->
    <div class="flex pt-4 flex-row justify-center gap-4"> <button @click="refresh">asd </button>
      <div v-if="true" id="google_translate_element"></div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  name: 'settings',
  data: function () {
    return {
      editable: false,
      render: false
    }
  },
  components: {},
  mounted () {},
  methods: {
    changeTheme () {
      if (this.darkTheme) store.commit('generic/setDarkTheme', { darkTheme: false })
      else store.commit('generic/setDarkTheme', { darkTheme: true })
    },
    refresh () {
      location.reload()
    }
  },
  computed: {
    darkTheme () { return store.state.generic.darkTheme }
  }
}
</script>
