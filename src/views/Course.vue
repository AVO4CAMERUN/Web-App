<template>
  <div class="overflow-auto bg-[#f0f3f6] scrollbar h-[100vh]">
    <div class="grid grid-cols-[20%,_auto] grid-rows-[minmax(10rem,_88vh),_minmax(10rem,_88vh)] p-8 gap-8">
      <Navbar></Navbar>
      <Video></Video>
      <VideoDescription></VideoDescription>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/UnitsNavbar.vue'
import Video from '../components/Video.vue'
import VideoDescription from '../components/VideoDescription.vue'
export default {
  name: 'course',
  data: function () {
  },
  components: {
    Navbar,
    Video,
    VideoDescription
  }
}
</script>

<style>
</style>
