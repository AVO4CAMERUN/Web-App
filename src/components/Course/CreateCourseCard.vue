<template>
  <div class="flex flex-wrap">
    <article class="w-[480px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">
      <!-- contenitore dell'immagine -->
      <div class="h-[200px] group cursor-pointer relative">
        <!-- testo che appare on hover  -->
        <div class="h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
          <p class="font-semibold text-xl dark:text-white">change cover</p>
        </div>
        <!-- immagine del corso https://picsum.photos/400/300 -->
        <img
          class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
          src="https://picsum.photos/400/300"
          draggable="false"
        >
        <input type="file" class="absolute inset-0 cursor-pointer opacity-0">
      </div>

      <header class="flex items-center justify-between leading-tight px-4 py-2">
        <h1>
          <!-- inserimento nome del corso -->
          <input
            class="text-lg border-b-2 border-gray-300 lg:whitespace-nowrap font-semibold focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="inserisci nome del corso"
            maxlength="15"
            v-model="course.name"
          >
        </h1>
        <!-- data di creazione del corso -->
        <div class="text-sm self-start dark:text-white">{{todayDate}}</div>
      </header>

      <select name="" class="text-sm mx-4">
        <option value="">subject</option>
      </select>

      <!-- descrizione del corso -->
      <textarea
        class="text-sm h-[7ex] resize-none w-[calc(100%_-_2rem)] break-words overflow-hidden m-2 mx-4 focus:outline-none dark:bg-slate-900 dark:text-white"
        placeholder="inserisci descrizione"
        maxlength="156"
        v-model="course.description"
      />

      <footer class="flex items-center justify-between leading-none px-4 pb-2">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">{{creatorName}}</p>
        </div>
        <button
          class="text-sm px-5 py-1.5 mr-2 mb-2 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :class="course.name === '' ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="course.name === '' ? true : false"
          @click="createCourse"
        > create course </button>
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
        subject: '' // change to enum
      }
    }
  },
  methods: {
    createCourse () {
      cs.createCourse(this.course)
        .then((response) => {
        })
    }
  },
  computed: {
    creatorName () { return store.state.login.email },
    todayDate () { const date = new Date(); return date.toLocaleDateString() }
  }
}
</script>
