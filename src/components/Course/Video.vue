<template>
  <div class="bg-white p-5 rounded-lg aspect-video items-center w-full">
      <YouTube
        v-if="render"
        class="h-full"
        :src="`${videoID}`"
        width="100%"
        height="100%"
        ref="youtube"
      />
  </div>
</template>

<script>
import YouTube from 'vue3-youtube'

export default {
  data: function () {
    return {
      render: false
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
    },
    onReady () {
      this.$refs.youtube.playVideo()
    }
  }
}
</script>

<style>
</style>
