<template>
  <div class="flex flex-col w-[60%] p-8 gap-4 rounded-xl shadow-xl border border-green-700 bg-white">
    <div class="flex flex-row justify-center gap-4">
      <div v-for="(option) in options" :key="option.name">
        <div class="flex flex-row justify-center items-center gap-2">
          <input type="checkbox" v-model="option.value" @click="changeTheme">
          <label>{{option.label}}</label>
        </div>
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
        { name: 'theme', label: 'Dark Mode', value: store.state.generic.darkTheme }
      ]
    }
  },
  components: {},
  mounted () {},
  methods: {
    changeTheme () {
      if (this.options[0].value) store.commit('generic/setDarkTheme', { darkTheme: false })
      else store.commit('generic/setDarkTheme', { darkTheme: true })
    }
  },
  computed: {
    darkTheme () { return store.state.generic.darkTheme }
  }
}
</script>
