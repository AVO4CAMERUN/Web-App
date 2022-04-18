<template>
  <div class="flex flex-col justify-center">

    <div class="flex flex-row gap-2 m-8 mb-2 p-2">
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
      <p class="text-green-800 text-xl font-semibold grow-0">Your own courses</p>
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

    <div class="flex flex-row gap-2 m-8 mb-2 p-2">
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
      <p class="text-green-800 text-xl font-semibold grow-0">Your own classes</p>
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
    </div>

    <!-- Class Grid -->
    <div class="m-8 mt-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
      <component
        :is="userClass.id === classToEdit ? 'CreateClassCard' : 'ClassCard'"
        v-for="(userClass, index) in classesCards"
        :key="userClass.id"
        :groupClass="userClass"
        :parent="'mycreations'"
        :participants="participants[index]"
        @removeCard="showPopUp"
        @setEdit="setClassEdit"
        @newClass="addClassCard"
      />

      <!-- Class Creation Card -->
      <CreateClassCard
        @newClass="addClassCard"
      />
    </div>

    <!-- Confirm Elimination Pop Up (non funziona. designer fate qualcosa)-->
    <PopUp
      v-if="showConfirm"
      @noAction="showConfirm = false"
      @doAction="doAction"
      :type="'confirm'"
      :message="'Warning'"
      :content="'Are you sure you want to delete this course?'"
    />
  </div>
</template>
<script>
import ClassCard from '@/components/Classes/ClassCard.vue'
import CourseCard from '@/components/Course/CourseCard.vue'
import CreateClassCard from '@/components/Classes/CreateClassCard.vue'
import CreateCourseCard from '@/components/Course/CreateCourseCard.vue'
import PopUp from '@/components/Base/PopUp.vue'
import { coursesService as cs } from '@/servises/course.services'
import { classesService as cls } from '@/servises/classes.services'
import store from '@/store/index'

export default {
  name: 'MyCreations',
  data: function () {
    return {
      courseToEdit: null,
      classToEdit: null,
      cardToRemove: {},
      showConfirm: false,
      coursesCards: [],
      classesCards: []
    }
  },
  components: {
    CreateClassCard,
    CreateCourseCard,
    CourseCard,
    ClassCard,
    PopUp
  },
  mounted () {
    // Fetch my courses and my classes
    this.fetchMyCoursesCreations(`?email_creator=["${store.state.login.email}"]`)
    this.fetchClasses()
  },
  methods: {
    // Classes Actions
    fetchClasses () { // Fetch
      store.dispatch('classes/fetchClasses', '')
        .then((response) => {
          this.classesCards = response
          if (this.classesCards === undefined || this.classesCards?.length === 0) return
          this.classesCards.forEach(c => {
            const date = new Date(c.creation_date)
            c.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
        })
    },
    setClassEdit (id) { // Set Edit Mode
      if (this.classToEdit === null || id === null) this.classToEdit = id
    },
    deleteClass () { // Delete
      this.showConfirm = false
      cls.deleteClassByID(this.cardToRemove.id)
        .then((response) => {
          if (response?.status === 200) {
            const index = this.classesCards.findIndex((grouoClass) => grouoClass.id === this.cardToRemove.id)
            this.classesCards.splice(index, 1)
            if (this.classesCards.length <= 0) this.empty = true
            else this.empty = false
          }
          this.cardToRemove = {}
        })
    },
    addClassCard (classID) { // Add Card
      this.classToEdit = null
      this.fetchClasses()
    },

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
      this.showConfirm = false
      cs.deleteCourseByID(this.cardToRemove.id)
        .then((response) => {
          if (response?.status === 200) {
            const index = this.coursesCards.findIndex((course) => course.courseID === this.tempCourseID)
            this.coursesCards.splice(index, 1)
            if (this.coursesCards.length <= 0) this.empty = true
            else this.empty = false
          }
          this.tempCourseID = null
        })
    },
    addCourseCard (courseID) { // Add Card
      this.courseToEdit = null
      this.fetchMyCoursesCreations(`?email_creator=["${store.state.login.email}"]`)
    },

    // Pop UP Actions
    showPopUp (obj) { // Show
      this.cardToRemove = obj
      this.showConfirm = true
    },
    doAction () { // Action
      this.cardToRemove.type === 'course' ? this.deleteCourse() : this.deleteClass()
    }
  },
  computed: {
    role () { return store.state.login.role },
    participants () {
      const part = []
      this.classesCards.forEach(e => {
        part.push(e.teachers.length + e.students.length)
      })
      return part
    }
  }
}
</script>
