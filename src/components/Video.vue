<template>
  <div class="bg-white p-5 rounded-lg aspect-video items-center">
    <div class="rounded-lg w-full h-full" id="player"></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {

    }
  },
  mounted () {
    // this.videoFrame()
  },
  methods: {
    onYouTubeIframeAPIReady () {
      
    },
    videoFrame () {
      var tag = document.createElement('script')

      tag.src = 'https://www.youtube.com/iframe_api'
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      var player
      function onYouTubeIframeAPIReady () {
        player = new YT.Player('player', {
          videoId: 'NEqcz2Fv4zc',
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        })
      }
      function onPlayerReady (event) {
        event.target.playVideo()
      }
      var done = false

      function onPlayerStateChange (event) {
        if (event.data === YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 1)
          done = true
        }
      }

      function stopVideo () {
        player.stopVideo()
      }
    }
  }
}
</script>

<style>
</style>
