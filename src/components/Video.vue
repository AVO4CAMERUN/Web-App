<template>
  <div class="bg-white p-5 rounded-lg aspect-video items-center w-full">
      <YouTube
        class="rounded-lg h-full"
        :src="`https://www.youtube.com/watch?v=${videoID}`"
        width="100%"
        height="100%"
        @ready="onReady"
        ref="youtube"
      />
  </div>
</template>

<script>
import YouTube from 'vue3-youtube'

export default {
  data: function () {
    return {}
  },
  components: {
    YouTube
  },
  props: {
    videoID: String
  },
  mounted () {},
  methods: {
    onReady () {
      this.$refs.youtube.playVideo()
    }
  }
}
</script>

<style>
</style>
