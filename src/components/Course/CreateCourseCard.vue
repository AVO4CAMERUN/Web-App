<template>
  <!-- Main -->
  <div class="flex flex-wrap ml-auto mr-auto md:m-0">
    <article class="w-[480px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] relative flex flex-row justify-end group">

        <!-- Hover -->
        <div class="h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
          <p class="font-semibold text-xl dark:text-white">change cover</p>
        </div>
        <img
          v-if="newCourse.img_cover"
          :src="`data:image/png;base64,${newCourse.img_cover}`"
          class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
          draggable="false"
        >
        <img v-else
          class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
          src="@/assets/img_default.png"
          draggable="false"
        >
        <input type="file" @input="setImage" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" />

        <!-- Remove Image -->
        <div class="w-[28px] h-[28px] aspect-square rounded-full absolute m-2 hover:scale-125 transition">
          <i class="fa-solid fa-circle-xmark cursor-pointer text-[28px] text-red-900 bg-transparent"
            v-if="newCourse.img_cover"
            @click.prevent="newCourse.img_cover = null"
          />
        </div>
      </div>

      <!-- Course Header (Name, Creation Date)-->
      <header class="flex items-center justify-between leading-tight px-4 py-2">
        <h1>
          <input
            class="text-lg border-b-2 border-gray-300 lg:whitespace-nowrap font-semibold focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="Course Name"
            maxlength="15"
            v-model="newCourse.name"
          >
        </h1>
        <div class="text-sm self-start dark:text-white pt-[4px]">
          {{course?.creation_date === undefined ? todayDate : course?.creation_date}}
        </div>
      </header>

      <!-- Subject -->
      <select v-model="newCourse.subject" class="text-sm mx-4 dark:bg-slate-900 dark:text-white focus:outline-none">
        <option v-for="subject in subjects" :key="subject" :disabled="subject === 'Select subject' ? true : false">
          {{subject}}
        </option>
      </select>

      <!-- Description (max length 102 characters to fit card dimensions) -->
      <textarea
        class="text-sm h-[7ex] resize-none w-[calc(100%_-_2rem)] break-words overflow-hidden m-2 mx-4 focus:outline-none dark:bg-slate-900 dark:text-white"
        placeholder="Course Description"
        maxlength="102"
        v-model="newCourse.description"
      />

      <!-- Footer (Creator, Buttons) -->
      <footer class="flex items-center justify-between leading-none px-4 pb-2">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">{{creatorName}}</p>
        </div>

        <!-- Creation Button -->
        <button v-if="!course?.name"
          class="text-sm px-5 py-1.5 mr-2 mb-2 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :class="newCourse.name.length < 3 || newCourse.subject === 'Select subject' ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="newCourse.name.length < 3 || newCourse.subject === 'Select subject' ? true : false"
          @click="createCourse"
        >
          Create Course
        </button>

        <!-- Editing Buttons -->
        <template v-else>
          <div class="flex flex-row gap-2">
            <button class="text-sm px-5 py-1.5 mb-2 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
            :class="newCourse.name.length < 3 || newCourse.subject === 'Select subject' ? 'cursor-not-allowed' : 'cursor-pointer'"
            :disabled="newCourse.name < 3 || newCourse.subject === 'Select subject' ? true : false"
            @click="updateCourse"
            >
              Save
            </button>
            <button class="text-sm px-5 py-1.5 mb-2 text-white bg-red-700 font-medium rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
              @click="this.$emit('setEdit', null)"
            >
              Discard
            </button>
          </div>
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
      newCourse: {
        name: '',
        description: '',
        img_cover: null,
        subject: 'Select subject'
      },
      subjects: ['Select subject']
    }
  },
  props: ['course'],
  emits: ['newCourse', 'setEdit'],
  mounted () {
    if (this.course !== undefined) {
      this.newCourse.name = this.course.name
      this.newCourse.description = this.course.description
      this.newCourse.img_cover = this.course.img_cover
      this.newCourse.subject = this.course.subject
    }
    this.fetchSubject()
  },
  methods: {
    // Course Creation Method (Services)
    createCourse () {
      cs.createCourse(this.newCourse)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('newCourse')
          }

          // reset course data
          this.newCourse = {
            name: '',
            description: '',
            img_cover: null,
            subject: 'Select subject'
          }
        })
    },
    // Course Update
    updateCourse () {
      cs.updateCourseByID(this.course.id_course, this.newCourse)
        .then((response) => {
          if (response?.status === 200) this.$emit('newCourse', this.course.id_course)
        })
    },
    // Convert image cover to Base64 and set preview
    setImage (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (files[0].size > 65535) console.log('too big') // inserire pop up errore
      const reader = new FileReader()

      reader.onload = (e) => {
        const tmp = e.target.result.split(',')
        this.newCourse.img_cover = tmp[1]
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
