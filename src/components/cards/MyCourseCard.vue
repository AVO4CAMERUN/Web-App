<template>
  <router-link to="/course">
    <div class="flex flex-wrap" >
      <article class="h-[300px] w-[400px] overflow-hidden rounded-lg shadow-lg">
        <div class="h-[120px] w-[400px]">
          <img
          v-if="courseCover !== ''"
          :src="`data:image/png;base64,${courseCover}`"
          class="block w-full h-full object-cover"
          alt="img"
          >
          <img v-else class="block w-full h-full object-cover" src="https://picsum.photos/400/300">
        </div>
        <header class="flex items-center justify-between leading-tight p-4">
          <h1>
            <span class="text-lg lg:whitespace-nowrap">{{courseName}}</span>
          </h1>
          <div class="text-sm">{{creationDate}}</div>
        </header>

        <div class="h-[62px] w-[300px] break-all overflow-hidden p-2 pl-4">{{courseDescription}}</div>

        <footer class="flex items-center justify-between leading-none p-4">
          <div class="flex items-center">
            <p class="text-sm">{{creatorName}}</p>
          </div>
          <div class="cursor-pointer">
            <svg class="hover:scale-90 rounded-full" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: rgba(253, 5, 5, 1);transform: ;msFilter:;">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z"></path>
            </svg>
          </div>
        </footer>
      </article>
    </div>
  </router-link>
</template>

<script>
import { subscribeService as sub } from '@/servises/subscribe.service'
// import store from '../store/index'

export default {
  name: 'MyCoursesCard',
  data: function () {
    return {
      id: this.courseID
    }
  },
  methods: {
    addCourses () {
      sub.subscribe(this.id)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/mycourses')
          } else { /* err */ }
        })
    }
  },
  computed: {},
  props: {
    progress: Number,
    courseID: Number,
    courseName: String,
    courseDescription: String,
    courseCover: String,
    creatorName: String,
    creationDate: String
  }
}

</script>

<style>
</style>
