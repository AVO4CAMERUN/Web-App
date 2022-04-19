<template>
  <!-- Main -->
  <div class="flex flex-wrap" @click="setCurrentCourse">
    <article class="w-[480px] cursor-pointer bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] relative flex flex-row justify-end">
        <img
          v-if="course.img_cover !== '' && course.img_cover != null"
          :src="`data:image/png;base64,${course.img_cover}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        >
        <img
          v-else
          class="block w-full h-full object-cover"
          src="@/assets/img_default.png"
          draggable="false"
        >
      </div>

      <!-- Course Header (Name, Creation Date, Subject)-->
      <header class="flex items-center justify-between px-4 py-2">
        <h1>
          <span class="text-lg lg:whitespace-nowrap font-semibold dark:text-white">
            {{course.name}}
          </span>
          <div class="text-sm dark:text-white">
            <i>{{course.subject}}</i>
          </div>
        </h1>
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{course.creation_date}}
        </div>
      </header>

      <!-- Description -->
      <p class="h-[9ex] w-[calc(100%_-_2rem)] break-words overflow-hidden m-2 mx-4 text-sm dark:text-white" :class="course.description === null ? 'text-slate-700' : ''">
        {{course.description === null || course.description === '' ? 'no description provided' : course.description}}
      </p>

      <!-- Footer (Creator, Buttons) -->
      <footer class="flex items-center justify-between leading-none px-4 pb-2">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">
            {{course.email_creator}}
          </p>
        </div>
        <!-- Buttons Conditional Rendering -->
        <div v-if="parent === 'inscriptions'" class="cursor-pointer">
          <i @click.stop="removeCourse" class="bx bxs-minus-circle text-rose-600 text-[32px]" /> <!-- Remove Course -->
        </div>
        <div v-else-if="parent === 'search'" class="cursor-pointer">
          <i v-if="!subscribed" @click.stop="addCourses" class="bx bxs-plus-circle text-black text-[32px] dark:invert" /> <!-- Add Course -->
          <i v-else class="bx bxs-check-circle text-emerald-600 text-[32px]"/> <!-- Already Added Course -->
        </div>
        <div v-else-if="parent === 'mycreations'" class="cursor-pointer">
          <i @click.stop="this.$emit('setEdit', courseID)" class='bx bx-edit text-black text-[32px] dark:invert' /> <!-- Edit Course -->
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
      sub.deleteSubscribtion(this.course.id_course)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('courseID', this.course.id_course)
          }
        })
    },
    addCourses () {
      // Request to subscribe
      sub.postSubscription(this.course.id_course)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push('/inscriptions')
          }
          this.$emit('error', response.status)
        })
    },
    deleteCourse () {
      this.$emit('removeCard', { id: this.course.id_course, type: 'course', name: this.course.name })
    },
    setCurrentCourse (id) {
      store.dispatch('course/setCurrentCourse', this.course.id_course)
        .then(() => {
          if (this.parent !== 'mycreations') router.push({ name: 'course' })
          else router.push({ name: 'course', query: { edit: 'on' } })
        })
    }
  },
  props: ['course', 'progress', 'parent', 'subscribed'],
  emits: ['setEdit', 'removeCard', 'error', 'courseID', 'newCourse']
}
</script>
