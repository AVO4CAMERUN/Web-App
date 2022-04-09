<template>
    <!-- Start -->
    <div class="w-[480px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">
        <!-- image container -->
        <div class="h-[200px] group cursor-pointer relative">

            <!-- on hover text  -->
            <div class="h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
                <p class="font-semibold text-xl dark:text-white">change cover</p>
            </div>

            <img v-if="class.img_cover" :src="`data:image/png;base64,${class.img_cover}`" class="block w-full h-full object-cover" draggable="false">

            <img v-else
                class="block w-full h-full object-cover group-hover:opacity-40 duration-200"
                src="https://picsum.photos/400/300"
                draggable="false"
            >
            <input type="file" @change="setImage" class="absolute inset-0 cursor-pointer opacity-0">
        </div>

        <header class="flex flex-col items-center p-4">
            <!-- name class  -->
            <input
                type="text"
                class="text-black text-2xl font-bold capitalize border-b-2 border-gray-300 lg:whitespace-nowrap focus:outline-none dark:bg-slate-900 dark:text-white" placeholder="Class Name">
                maxlength="15"
                v-model="class.name"
            <p class="text-black inline-flex items-center text-xs dark:text-white">
                Online {{}}
                <span class="ml-2 w-2 h-2 block bg-red-400 rounded-full animate-pulse"></span>
            </p>
        </header>

        <footer class="flex justify-center leading-none px-4">
        <button
            class="text-sm px-5 py-2.5 mr-2 mb-8 text-white bg-green-700 font-medium rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
            :class="class.name === '' ? 'cursor-not-allowed' : 'cursor-pointer'"
            :disabled="class.name === '' ? true : false"
            @click="createclass"
        >
        Create Class
        </button>
        </footer>
    </div>
    <!-- End -->
</template>

<script>
import { classesService as cs } from '@/servises/class.services'

export default {
  name: 'CreateClassCard',
  data: function () {
    return {
      class: {
        name: '',
        img_cover: ''
      }
    }
  },
  methods: {
    createClass () {
      cs.createClass(this.class)
        .then((response) => {
          if (response?.status === 200) {
            this.$emit('newClass', this.classID)
          }

          // reset class data
          this.class = {
            name: '',
            img_cover: ''
          }
        })
    },
    setImage (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      const reader = new FileReader()

      reader.onload = (e) => {
        const tmp = e.target.result.split(',')
        this.class.img_cover = tmp[1]
      }
      reader.readAsDataURL(files[0])
    }
  }
}
</script>
