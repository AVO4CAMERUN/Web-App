<template>
  <!-- Main -->
  <div
    class="flex flex-wrap"
    @click="setCurrentCourse"
  >
    <article class="w-[470px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] relative">
        <img
          v-if="courseCover !== ''"
          :src="`data:image/png;base64,${courseCover}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        >
        <img
          v-else
          class="block w-full h-full object-cover"
          src="https://picsum.photos/400/300"
          draggable="false"
        >
      </div>

      <!-- Course Header (Name, Creation Date, Subject)-->
      <header class="flex items-center justify-between px-4 py-2">
        <h1>
          <span class="text-lg lg:whitespace-nowrap font-semibold dark:text-white">
            {{courseName}}
          </span>
          <div class="text-sm dark:text-white">
            <i>{{courseSubject}}</i>
          </div>
        </h1>
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{creationDate}}
        </div>
      </header>

      <!-- Description -->
      <p class="h-[9ex] w-[calc(100%_-_2rem)] break-words overflow-hidden m-2 mx-4 text-sm dark:text-white" :class="courseDescription === null ? 'text-slate-700' : ''">
        {{courseDescription === null ? 'no description provided' : courseDescription}}
      </p>

      <!-- Footer (Creator, Buttons) -->
      <footer class="flex items-center justify-between leading-none px-4 pb-2">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">{{creatorName}}</p>
        </div>
        <!-- Buttons Conditional Rendering -->
        <div v-if="parent === 'inscriptions'" class="cursor-pointer">
          <i @click.stop="removeCourse" class="bx bxs-minus-circle text-rose-600 text-[32px]" /> <!-- Remove Course -->
        </div>
        <div v-else-if="parent === 'search'" class="cursor-pointer">
          <i v-if="!subscribed" @click="addCourses" class="bx bxs-plus-circle text-black text-[32px] dark:invert" /> <!-- Add Course -->
          <i v-else class="bx bxs-check-circle text-emerald-600 text-[32px]"/> <!-- Already Added Course -->
        </div>
        <div v-else-if="parent === 'mycreations'" class="cursor-pointer">
          <i @click.stop="setCurrentCourse" class='bx bx-edit text-black text-[32px] dark:invert' /> <!-- Edit Course -->
          <i @click.stop="deleteCourse" class="bx bx-trash text-rose-600 text-[32px]" /> <!-- Delete Course -->
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import router from '@/router/index'
import store from '@/store/index'
import { subscribeService as sub } from '@/servises/subscribe.service'

export default {
  name: 'CourseCard',
  data: function () {
    return {}
  },
  methods: {
    removeCourse () {
      sub.deleteSubscribtion(this.courseID)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('courseID', this.courseID)
          }
        })
    },
    addCourses () {
      // Request to subscribe
      sub.postSubscription(this.courseID)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/inscriptions')
          } else {}
          this.$emit('error', response.status)
        })
    },
    deleteCourse () {
      this.$emit('course-to-removeID', this.courseID)
    },
    setCurrentCourse (id) {
      store.dispatch('course/setCurrentCourse', this.courseID)
        .then(() => {
          if (this.parent !== 'mycreations') router.push({ name: 'course' })
          else router.push({ name: 'course', query: { edit: 'on' } })
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
