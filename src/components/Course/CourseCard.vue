<template>
  <component :is="parent === 'inscriptions' ? 'router-link' : 'div'"
      :to="parent === 'inscriptions' ? {name: 'course'} : ''"
      draggable="false"
    >
    <div class="flex flex-wrap">
      <article class="h-[400px] w-[480px] bg-gray-100 overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg shadow-xl dark:shadow-slate-900 dark:outline-gray-700 dark:bg-slate-900">
        <div class="h-[200px] relative">
          <img
            v-if="courseCover !== ''"
            :src="`data:image/png;base64,${courseCover}`"
            class="block w-full h-full object-cover"
            alt="img" draggable="false"
          >
          <img v-else class="block w-full h-full object-cover" src="https://picsum.photos/400/300" draggable="false">
        </div>
        <header class="flex items-center justify-between leading-tight p-4">
          <h1>
            <span class="text-lg lg:whitespace-nowrap font-semibold dark:text-white">{{courseName}}</span>
            <div class="text-sm dark:text-white">
              {{courseSubject}}
            </div>
          </h1>
          <div class="text-sm dark:text-white">{{creationDate}}</div>
        </header>

        <p class="h-[9ex] w-[calc(100%_-_2rem)] break-normal overflow-hidden m-2 mx-4 text-sm dark:text-white" :class="courseDescription === null ? 'text-slate-700' : ''">
          {{courseDescription === null ? 'no description provided' : courseDescription}}
        </p>

        <footer class="flex items-center justify-between leading-none px-4">
          <div class="flex items-center">
            <p class="text-sm dark:text-white">{{creatorName}}</p>
          </div>
          <div v-if="parent === 'inscriptions'" class="cursor-pointer">
            <i @click.prevent="removeCourse" class="bx bxs-minus-circle text-rose-600 text-[32px]" />
          </div>
          <div v-if="parent === 'search'" class="cursor-pointer">
            <i v-if="!subscribed" @click="addCourses" class="bx bxs-plus-circle text-black text-[32px] dark:invert" />
            <i v-else class="bx bxs-check-circle text-emerald-600 text-[32px]"/>
          </div>
        </footer>
      </article>
    </div>
  </component>
</template>

<script>
import store from '@/store/index'
import { subscribeService as sub } from '@/servises/subscribe.service'

export default {
  name: 'CourseCard',
  data: function () {
    return {}
  },
  methods: {
    removeCourse () {
      sub.deleteSubscribtion(this.courseID, store.state.login.accessToken)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('courseID', this.courseID)
            // location.reload()
          } else { }
        })
    },
    addCourses () {
      // Request to subscribe
      sub.subscribe(this.courseID, store.state.login.accessToken)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/inscriptions')
          } else {}
          this.$emit('error', response.status)
        })
    }
  },
  props: {
    progress: Number,
    courseID: Number,
    courseName: String,
    courseDescription: String,
    courseCover: String,
    creatorName: String,
    creationDate: String,
    courseSubject: String,
    parent: String,
    subscribed: Boolean
  }
}
</script>
