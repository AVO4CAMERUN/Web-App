<template>
  <div class="flex flex-col justify-center">

    <div class="flex flex-row gap-2 m-8 mb-2 p-2">
      <hr class="rounded h-1 bg-green-700 self-center grow">
      <p class="text-green-800 text-xl font-semibold grow-0">Your own courses</p>
      <hr class="rounded h-1 bg-green-700 self-center grow">
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
      <hr class="rounded h-1 bg-green-700 self-center grow">
      <p class="text-green-800 text-xl font-semibold grow-0">Your own classes</p>
      <hr class="rounded h-1 bg-green-700 self-center grow">
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

    <div class="absolute top-[7%] right-[6%]">
      <!-- Container -->
      <!-- se non ci sono notifiche 'rounded-xl' se ci sono notifiche 'rounded-l-xl' -->
      <div class="max-h-[174px] max-w-sm rounded-l-xl overflow-y-auto border-2 border-gray-400 dark:border-2 dark:border-white">

        <!-- Notifica Invito Classe -->
        <div class="max-w-sm p-4 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
          <div class="flex flex-row gap-2 w-full h-full">
            <!-- Icon -->
            <div class="flex justify-center items-center w-12 h-12 aspect-square rounded-full bg-green-100 dark:text-blue-300 dark:bg-blue-900">
              <i class="fa-solid fa-envelope-open-text text-[28px] text-green-600 dark:text-gray-400"></i>
            </div>
            <!-- Content Start -->
            <div class="flex flex-col justify-between gap-6 p-2">
              <!-- Text -->
              <div class="flex flex-col gap-2">
                <span class="text-sm font-semibold text-gray-900 dark:text-white">Join the class</span>
                <div class="text-sm font-normal break-all">Paolo Nesi invite you to join in the class</div>
              </div>
              <!-- Buttons -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <button class="w-full px-2 py-1.5 justify-center text-xs font-medium text-center text-white bg-green-700 rounded-lg
                                hover:bg-green-800
                                focus:ring-4 focus:outline-none focus:ring-green-300
                                dark:bg-blue-500
                                dark:hover:bg-blue-600
                                dark:focus:ring-blue-800">Accept</button>
                </div>
                <div>
                  <button class="w-full px-2 py-1.5 justify-center text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg
                                hover:bg-gray-100
                                focus:ring-4 focus:outline-none focus:ring-gray-200
                                dark:bg-gray-600 dark:text-white dark:border-gray-600
                                dark:hover:bg-gray-700 dark:hover:border-gray-700
                                dark:focus:ring-gray-700">Reject</button>
                </div>
              </div>
            </div>
            <!-- Content End -->
            <!-- Remove Icon -->
            <button type="button" class="h-8 w-8 p-1.5 bg-white text-gray-400 rounded-lg
                                        hover:text-gray-900 hover:bg-gray-100
                                        focus:ring-2 focus:ring-gray-300
                                        dark:text-gray-500 dark:bg-gray-800
                                        dark:hover:text-white
                                        dark:hover:bg-gray-700">

              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Nessuna Notifica -->
        <!-- <div class="flex flex-row justify-left items-center gap-4 p-4 text-sm text-blue-600 bg-blue-200">
          <i class="fa-solid fa-circle-info text-[20px]"></i>
          <p>No notification to read</p>
        </div> -->
      </div>
    </div>
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
