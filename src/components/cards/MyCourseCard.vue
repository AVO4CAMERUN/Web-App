<template>
  <div class="card">
    <div class="course">
      {{courseName}}
      <div class="under-course">{{creatorName}}</div>
    </div>
    <div class="course-box-icons">
      <img
        v-if="courseCover !== ''"
        :src="`data:image/png;base64,${courseCover}`"
        class="course-img"
        draggable="false"
      >
      <img
        v-else
        src="@/assets/icon.png"
        class="course-img"
        draggable="false"
      >
      <span class="course-links" @click="addCourses">
        <i class='bx bx-archive-in course-icons'></i>
      </span>
    </div>
    <div class="course-description">{{courseDescription}}</div>
  </div>
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
      // Request to subscribe
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
    creatorName: String
  }
}

</script>

<style>
</style>
