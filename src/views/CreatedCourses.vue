<template>
  <div class="flex flex-col justify-center">
    <!-- Header -->
    <div class="flex flex-row gap-2 m-8 mb-2 p-2">
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
      <p class="text-green-800 text-xl font-semibold grow-0">Created Courses</p>
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
    </div>

    <!-- Courses Grid -->
    <div class="m-8 mb-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
      <component
        :is="course.courseID === courseToEdit ? 'CreateCourseCard' : 'CourseCard'"
        v-for="(course) in coursesCards"
        :key="course.id"
        :course="course"
        :parent="'mycreations'"
        @removeCard="showPopUp"
        @setEdit="setCourseEdit"
        @newCourse="addCourseCard"
      />

      <!-- Course Creation Card -->
      <CreateCourseCard
        @newCourse="addCourseCard"
      />
    </div>

    <!-- Confirm Elimination Pop Up -->
    <PopUp
      v-if="showConfirm"
      @noAction="showConfirm = false"
      @doAction="doAction"
      :type="'confirm'"
      :message="'Warning'"
      :content="`Are you sure you want to delete this ${popUpContent}?`"
    />
  </div>
</template>

<script>
import CourseCard from '@/components/Course/CourseCard.vue'
import CreateCourseCard from '@/components/Course/CreateCourseCard.vue'
import PopUp from '@/components/Base/PopUp.vue'
import { coursesService as cs } from '@/servises/course.services'
import store from '@/store/index'

export default {
  name: 'MyCreations',
  data: function () {
    return {
      courseToEdit: null,
      cardToRemove: {},
      showConfirm: false,
      coursesCards: [],
      popUpContent: ''
    }
  },
  components: {
    CreateCourseCard,
    CourseCard,
    PopUp
  },
  mounted () {
    // Fetch my courses
    this.fetchMyCoursesCreations(`?email_creator=["${store.state.login.email}"]`)
  },
  methods: {
    // Courses Actions
    fetchMyCoursesCreations (filter) { // Fetch
      store.dispatch('course/fetchCourses', filter)
        .then((response) => {
          if (response.status === 404) {
            this.empty = true
            return
          }
          let ids = ''; response.forEach(c => { ids += `"${c.id_course}",` })
          ids = ids.substring(0, ids.length - 1)
          return store.dispatch('course/fetchCourses', `?id_course=[${ids}]`)
        })
        .then((courses) => {
          this.coursesCards = courses
          this.coursesCards.forEach(card => {
            const date = new Date(card.creation_date)
            card.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
          if (this.coursesCards.length <= 0) this.empty = true
          else this.empty = false
        })
        .catch(() => {})
    },
    setCourseEdit (id) { // Set Edit Mode
      if (this.courseToEdit === null || id === null) this.courseToEdit = id
    },
    deleteCourse () { // Delete
      console.log(this.cardToRemove?.id)
      this.showConfirm = false
      cs.deleteCourseByID(this.cardToRemove?.id)
        .then((response) => {
          if (response?.status === 200) {
            const index = this.coursesCards.findIndex((course) => course.id_course === this.cardToRemove.id)
            this.coursesCards.splice(index, 1)
            if (this.coursesCards.length <= 0) this.empty = true
            else this.empty = false
          }
          this.cardToRemove = null
        })
    },
    addCourseCard (courseID) { // Add Card
      this.courseToEdit = null
      this.fetchMyCoursesCreations(`?email_creator=["${store.state.login.email}"]`)
    },

    // Pop UP Actions
    showPopUp (obj) { // Show
      this.popUpContent = `${obj.type} (${obj.name})`
      this.cardToRemove = obj
      this.showConfirm = true
    },
    doAction () { // Action
      this.deleteCourse()
    }
  },
  computed: {
    role () { return store.state.login.role }
  }
}
</script>
