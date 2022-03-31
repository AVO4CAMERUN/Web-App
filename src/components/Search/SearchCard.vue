<template>
  <div class="flex flex-wrap">
    <article class="h-[300px] w-[400px] bg-gray-100 overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg shadow-xl dark:shadow-slate-600 dark:outline-gray-700 dark:bg-slate-900">
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
          <span class="text-lg lg:whitespace-nowrap font-semibold dark:text-white">{{courseName}}</span>
        </h1>
        <div class="text-sm dark:text-white">{{creationDate}}</div>
      </header>

      <p class="h-[9ex] w-[calc(100%_-_2rem)] break-normal overflow-hidden m-2 mx-4 text-sm dark:text-white">
        {{courseDescription}}
      </p>

      <footer class="flex items-center justify-between leading-none px-4">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">{{creatorName}}</p>
        </div>
        <div class="cursor-pointer">
          <!-- <i class="bx bxs-check-circle text-emerald-500 text-[32px]"></i> --> <!-- Added -->
          <i class="bx bxs-plus-circle text-black text-[32px]"></i> <!-- + -->
          <!-- Per il - <i class="bx bxs-minus-circle text-rose-600 text-[32px]"></i> --> <!-- - -->
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import { subscribeService as sub } from '@/servises/subscribe.service'
import store from '@/store/index'
// <i class="fa-solid fa-circle-plus text-2xl hover:shadow-lg  rounded-full border-2 border-solid border-black" @click="addCourses"></i>

export default {
  name: 'SearchCard',
  data: function () {
    return {
      id: this.courseID
    }
  },
  props: {
    progress: Number,
    courseID: Number,
    courseName: String,
    courseDescription: String,
    courseCover: String,
    creatorName: String,
    creationDate: String
  },
  methods: {
    addCourses () {
      // Request to subscribe
      sub.subscribe(this.id, store.state.login.accessToken)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/mycourses')
          } else {}
          this.$emit('error', response.status)
        })
    }
  }
}

</script>

<style>
</style>
