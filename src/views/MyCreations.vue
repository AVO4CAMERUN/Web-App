<template>
  <div class="flex flex-col justify-center">

    <div class="flex flex-row gap-2 m-8 mb-2 bg-none p-2">
      <hr class="rounded border-[2px] border-green-700 self-center grow">
      <p class="grow-0 text-green-800 text-xl font-semibold">Your own courses</p>
      <hr class="rounded border-[2px] border-green-700 self-center grow">
    </div>

    <!-- Courses Grid -->
    <div class="m-8 mb-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
      <component
        :is="card.courseID === courseToEdit ? 'CreateCourseCard' : 'CourseCard'"
        v-for="(card) in coursesCards"
        :key="card.id"
        :courseID="card.courseID"
        :courseName="card.courseName"
        :courseDescription="card.courseDescription"
        :courseCover="card.courseCover"
        :creatorName="card.creatorName"
        :creationDate="card.creationDate"
        :courseSubject="card.courseSubject"
        :parent="'mycreations'"
        @course-to-removeID="showPopUp"
        @setEdit="setCourseEdit"
        @newCourse="addCourseCard"
      />

      <!-- Course Creation Card -->
      <CreateCourseCard
        @newCourse="addCourseCard"
      />
    </div>

    <div class="flex flex-row gap-2 m-8 mb-2 bg-none p-2">
      <hr class="rounded border-[2px] border-green-700 self-center grow">
      <p class="grow-0 text-green-800 text-xl font-semibold">Your own classes</p>
      <hr class="rounded border-[2px] border-green-700 self-center grow">
    </div>

    <!-- Class Grid -->
    <div class="m-8 mt-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
      <component
        :is="userClass.id === classToEdit ? 'CreateClassCard' : 'ClassCard'"
        v-for="(userClass, index) in classesCards"
        :key="userClass.id"
        :classId="userClass.id"
        :name="userClass.name"
        :classImg="userClass.img_cover"
        :creationDate="userClass.creation_date"
        :description="null"
        :archived="userClass.archived"
        :parent="'mycreations'"
        :participants="participants[index]"
        @setEdit="setClassEdit"
        @newClass="addClassCard"
      />

      <!-- Class Creation Card -->
      <CreateClassCard
        @newClass="addClassCard"
      />
    </div>

    <!-- Confirm Elimination Pop Up (non funziona. designer fate qualcosa)-->
    <div class="flex flex-col absolute self-center">
      <PopUp
        v-if="showConfirm"
        @noAction="showConfirm = false"
        @doAction="deleteCourse"
        :type="'confirm'"
        :message="'Warning'"
        :content="'Are you sure you want to delete this course?'"
      />
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
import store from '@/store/index'

export default {
  name: 'MyCreations',
  data: function () {
    return {
      courseToEdit: null,
      classToEdit: null,
      tempCourseID: null,
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
    this.fetchMyCoursesCreations(`?email_creator=["${store.state.login.email}"]`)
    this.fetchClasses()
  },
  methods: {
    fetchMyCoursesCreations (filter) {
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
          this.coursesCards = []
          courses.forEach(course => {
            const date = new Date(course.creation_date)
            this.coursesCards.push({
              courseID: course.id_course,
              courseName: course.name,
              courseDescription: course.description,
              creatorName: course.email_creator,
              courseSubject: course.subject,
              courseCover: course.img_cover,
              creationDate: `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
            })
          })
          if (this.coursesCards.length <= 0) this.empty = true
          else this.empty = false
        })
        .catch(() => {})
    },
    fetchClasses () {
      store.dispatch('classes/fetchClasses', '')
        .then((response) => {
          this.classesCards = response
          this.classesCards.forEach(c => {
            const date = new Date(c.creation_date)
            c.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
        })
    },
    // Delete Course
    deleteCourse () {
      this.showConfirm = false
      cs.deleteCourseByID(this.tempCourseID)
        .then((response) => {
          if (response?.status === 200) {
            console.log('das')
            const index = this.coursesCards.findIndex((course) => course.courseID === this.tempCourseID)
            this.coursesCards.splice(index, 1)
            if (this.coursesCards.length <= 0) this.empty = true
            else this.empty = false
          }
          this.tempCourseID = null
        })
    },
    addCourseCard (courseID) {
      this.courseToEdit = null
      this.fetchMyCoursesCreations(`?email_creator=["${store.state.login.email}"]`)
    },
    addClassCard (classID) {
      this.classToEdit = null
      this.fetchClasses()
    },
    // Show Delete Course PopUp
    showPopUp (courseID) {
      this.tempCourseID = courseID
      this.showConfirm = true
    },
    setCourseEdit (id) {
      if (this.courseToEdit === null || id === null) this.courseToEdit = id
    },
    setClassEdit (id) {
      if (this.classToEdit === null || id === null) this.classToEdit = id
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
