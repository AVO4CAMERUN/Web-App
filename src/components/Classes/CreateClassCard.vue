<template>
  <!-- Main -->
  <div class="flex flex-wrap">
    <article class="w-[480px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] group cursor-pointer relative">

        <!--Hover Text  -->
        <div class="h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
          <p class="font-semibold text-xl dark:text-white">change cover</p>
        </div>

        <img
          v-if="newClass.img_cover"
          :src="`data:image/png;base64,${newClass.img_cover}`"
          class="block w-full h-full object-cover"
          draggable="false"
        >
        <img
          v-else
          class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
          src="https://picsum.photos/400/300"
          draggable="false"
        >
        <input type="file" @change="setImage" class="absolute inset-0 cursor-pointer opacity-0">
      </div>

      <!-- Header -->
      <header class="flex flex-row items-center justify-center leading-tight p-4">
        <!-- Class Name -->
        <h1>
          <input
            type="text"
            class="center text-black text-2xl font-bold capitalize border-b-2 border-gray-300 lg:whitespace-nowrap focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="Class Name"
            maxlength="15"
            v-model="newClass.name"
          >
        </h1>
        <!-- Date -->
        <!-- <div class="text-sm self-start pt-[4px] dark:text-white">
          {{todayDate}}
        </div> -->
      </header>

      <!-- Footer -->
      <footer class="flex flex-row justify-center items-center gap-8 p-4">
        <!-- Create Class Button -->
        <button
          class="text-sm px-5 py-2.5 text-white bg-green-700 font-medium rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :class="newClass.name === '' ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="newClass.name === '' ? true : false"
          @click="createClass"
        >
          Create Class
        </button>
      </footer>
    </article>
  </div>
</template>

<script>
import { classesService as cs } from '@/servises/classes.services'

export default {
  name: 'CreateClassCard',
  data: function () {
    return {
      newClass: {
        name: '',
        img_cover: ''
      }
    }
  },
  methods: {
    // Class Creation Method (Services)
    createClass () {
      cs.createClass(this.newClass)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('newClass', this.classID)
          }

          // reset class data
          this.newClass = {
            name: '',
            img_cover: ''
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
        this.newClass.img_cover = tmp[1]
      }
      reader.readAsDataURL(files[0])
    }
  },
  computed: {
    todayDate () { const date = new Date(); return date.toLocaleDateString() }
  }
}
</script>
