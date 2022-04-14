<template>
  <!-- Main -->
  <div class="flex flex-wrap">
    <article class="w-[480px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] group cursor-pointer relative">
        <div class="h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
          <p class="font-semibold text-xl dark:text-white">change cover</p>
        </div>
        <img
          v-if="course.img_cover"
          :src="`data:image/png;base64,${course.img_cover}`"
          class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
          draggable="false"
        >
        <img v-else
          class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
          src="@/assets/img_default.png"
          draggable="false"
        >
        <input type="file" accept="image/*" @change="setImage" class="absolute inset-0 cursor-pointer opacity-0" />
      </div>

      <!-- Course Header (Name, Creation Date)-->
      <header class="flex items-center justify-between leading-tight px-4 py-2">
        <h1>
          <input
            class="text-lg border-b-2 border-gray-300 lg:whitespace-nowrap font-semibold focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="insert course name"
            maxlength="15"
            v-model="course.name"
          >
        </h1>
        <div class="text-sm self-start dark:text-white pt-[4px]">
          {{creationDate === undefined ? todayDate : creationDate}}
        </div>
      </header>

      <!-- Subject -->
      <select v-model="course.subject" class="text-sm mx-4 dark:bg-slate-900 dark:text-white focus:outline-none">
        <option v-for="subject in subjects" :key="subject" :disabled="subject === 'Select subject' ? true : false">
          {{subject}}
        </option>
      </select>

      <!-- Description (max length 102 characters to fit card dimensions) -->
      <textarea
        class="text-sm h-[7ex] resize-none w-[calc(100%_-_2rem)] break-words overflow-hidden m-2 mx-4 focus:outline-none dark:bg-slate-900 dark:text-white"
        placeholder="insert description"
        maxlength="102"
        v-model="course.description"
      />

      <!-- Footer (Creator, Buttons) -->
      <footer class="flex items-center justify-between leading-none px-4 pb-2">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">{{creatorName}}</p>
        </div>

        <!-- Creation Button -->
        <button v-if="courseName === undefined"
          class="text-sm px-5 py-1.5 mr-2 mb-2 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :class="course.name === '' || course.subject === 'Select subject' ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="course.name === '' || course.subject === 'Select subject' ? true : false"
          @click="createCourse"
        >
          Create Course
        </button>

        <!-- Editing Buttons -->
        <template v-else>
          <button class="text-sm px-5 py-1.5 mr-2 mb-2 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
            :class="course.name === '' || course.subject === 'Select subject' ? 'cursor-not-allowed' : 'cursor-pointer'"
            :disabled="course.name === '' || course.subject === 'Select subject' ? true : false"
            @click="updateCourse"
          >
            Save
          </button>
          <button class="text-sm px-5 py-1.5 mr-2 mb-2 text-white bg-red-700 font-medium rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
            @click="this.$emit('setEdit', null)"
          >
            Discard
          </button>
        </template>
      </footer>
    </article>
  </div>
</template>

<script>
import store from '@/store/index'
import { coursesService as cs } from '@/servises/course.services'

export default {
  name: 'CreateCourseCard',
  data: function () {
    return {
      course: {
        name: '',
        description: '',
        img_cover: '',
        subject: 'Select subject'
      },
      subjects: ['Select subject']
    }
  },
  props: [
    'courseID', 'courseName', 'courseDescription',
    'courseCover', 'creationDate', 'courseSubject'
  ],
  mounted () {
    if (this.courseName) {
      this.course.name = this.courseName
      this.course.description = this.courseDescription
      this.course.img_cover = this.courseCover
      this.course.subject = this.courseSubject
    }
    this.fetchSubject()
  },
  methods: {
    // Course Creation Method (Services)
    createCourse () {
      cs.createCourse(this.course)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('newCourse', this.courseID)
          }

          // reset course data
          this.course = {
            name: '',
            description: '',
            img_cover: '',
            subject: 'Select subject'
          }
        })
    },
    // Course Update
    updateCourse () {
      cs.updateCourseByID(this.courseID, this.course)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('newCourse', this.courseID)
          }
        })
    },
    // Convert image cover to Base64 and set preview
    setImage (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      const reader = new FileReader()

      reader.onload = (e) => {
        const tmp = e.target.result.split(',')
        this.course.img_cover = tmp[1]
      }
      reader.readAsDataURL(files[0])
    },
    // Fetch course subjects for the select options (Services)
    fetchSubject () {
      cs.getCoursesSubject()
        .then((response) => response.json())
        .then((subjects) => { this.subjects.push(...subjects) })
    }
  },
  computed: {
    creatorName () { return store.state.login.email },
    todayDate () { const date = new Date(); return date.toLocaleDateString() }
  }
}
</script>
