<template>
  <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">

    <div class="flex flex-col items-center gap-4">
      <div v-for="(option) in options" :key="option.name">
        <legend>{{option.label}}</legend>
        <input type="checkbox" class="" v-model="option.newValue" @click="changeTheme">
      </div>
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
      options: [
        { name: 'theme', label: 'Change Theme', actualValue: 'light', newValue: '' }
      ]
    }
  },
  components: {},
  mounted () {},
  methods: {
    async changeTheme () {
      if (this.options[0].newValue) await store.commit('setDarkTheme', true)
      else await store.commit('setDarkTheme', false)
      console.log(store.state.darkTheme)
    }
  },
  computed: {}
}
</script>
