<template>
  <!-- Main -->
  <div class="flex flex-wrap">
    <article class="w-[480px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] relative flex flex-row justify-end group">

        <!-- Hover -->
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
          src="@/assets/img_default.png"
          draggable="false"
        >
        <input type="file" @change="setImage" class="absolute inset-0 cursor-pointer opacity-0">

        <!-- Remove Image -->
        <div class="w-[28px] h-[28px] aspect-square rounded-full absolute m-2 hover:scale-125 transition">
          <i class="fa-solid fa-circle-xmark cursor-pointer text-[28px] text-red-900 bg-transparent"
            v-if="newClass.img_cover"
            @click.prevent="newClass.img_cover = ''"
          />
        </div>
      </div>

      <!-- Header -->
      <header class="flex justify-between leading-tight p-4">
        <!-- Class Name -->
        <h1>
          <input
            type="text"
            class="w-[90%] text-black text-xl font-bold border-b-2 border-gray-300 lg:whitespace-nowrap focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="Class Name"
            maxlength="20"
            v-model="newClass.name"
          >
        </h1>

        <!-- Date -->
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{groupClass?.creation_date === undefined ? todayDate : groupClass.creation_date}}
        </div>
      </header>

      <!-- Description -->
      <textarea
        class="text-sm h-[8ex] mx-4 resize-none w-[calc(100%_-_2rem)] break-words overflow-hidden focus:outline-none dark:bg-slate-900 dark:text-white"
        placeholder="Class Description"
        maxlength="102"
        v-model="newClass.description"
      />

      <!-- Footer -->
      <footer class="flex flex-row justify-center items-center gap-8 p-4">
        <!-- Create Class Button -->
        <button v-if="!groupClass?.name"
          class="text-sm px-5 py-2.5 text-white bg-green-700 font-medium rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :class="newClass.name.length < 3 ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="newClass.name.length < 3 ? true : false"
          @click="createClass"
        >
          Create Class
        </button>

        <!-- Editing Buttons -->
        <template v-else>
          <div class="flex flex-row gap-2">
            <button class="text-sm px-5 py-2.5 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
            :class="newClass.name.length < 3 ? 'cursor-not-allowed' : 'cursor-pointer'"
            :disabled="newClass.name.length < 3 ? true : false"
            @click="updateClass"
            >
              Save
            </button>
            <button class="text-sm px-5 py-2.5 text-white bg-red-700 font-medium rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
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
import { classesService as cs } from '@/servises/classes.services'

export default {
  name: 'CreateClassCard',
  data: function () {
    return {
      newClass: {
        name: '',
        img_cover: '',
        description: ''
      }
    }
  },
  props: ['groupClass', 'parent'],
  mounted () {
    if (this.groupClass) {
      this.newClass.name = this.groupClass.name
      this.newClass.description = this.groupClass.description
      this.newClass.img_cover = this.groupClass.img_cover
    }
  },
  methods: {
    // Class Creation Method (Services)
    createClass () {
      cs.createClass(this.newClass)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('newClass')
          }

          // reset class data
          this.newClass = {
            name: '',
            img_cover: '',
            description: ''
          }
        })
    },
    // Update Class data
    updateClass () {
      const obj = { name: this.newClass.name, img_cover: this.newClass.img_cover }
      cs.updateClassByID(this.groupClass.id, obj)
        .then((response) => {
          if (response?.status === 200) this.$emit('newClass', this.groupClass.id)
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
