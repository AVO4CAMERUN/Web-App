<template>
  <div class="bg-white p-5 rounded-lg aspect-video items-center w-full shadow-xl">
      <YouTube
        v-if="render"
        :src="`${videoID}`"
        :vars="vars"
        width="100%"
        height="100%"
        ref="youtube"
        class="h-full"
      />
  </div>
</template>

<script>
import YouTube from 'vue3-youtube'

export default {
  data: function () {
    return {
      render: false,
      vars: {
        rel: '0'
      }
    }
  },
  components: {
    YouTube
  },
  props: {
    videoID: String
  },
  mounted () {
    setTimeout(this.timeout, 100)
  },
  methods: {
    timeout () {
      this.render = true
    }
  }
} // if (e == 0) e = 2
</script>

<style>
</style>
