<template>
  <div class="flex flex-nowrap">
    <article class="w-[480px] cursor-pointer bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">
      <div class="border h-[200px] relative">
        <img
          v-if="classImg !== '' && classImg != null"
          :src="`data:image/png;base64,${classImg}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="@/assets/img_default.png" draggable="false">
      </div>

      <header class="flex flex-row items-center justify-between leading-tight p-4">
        <!-- on edit mode disappear name and creation date -->
        <h1 class="overflow-hidden text-black text-xl font-bold capitalize dark:text-white">{{name}}</h1>
        <!-- <h1>
          <input
            type="text"
            class="w-[90%] text-black text-xl font-bold capitalize border-b-2 border-gray-300 lg:whitespace-nowrap focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="change name"
          >
        </h1> -->
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{creationDate}}
        </div>
      </header>

      <!-- Description -->
      <p class="h-[9ex] w-[calc(100%_-_2rem)] m-2 mx-4 break-words overflow-hidden text-sm dark:text-white">Descrizione della Classe</p>

      <footer class="flex flex-row justify-between items-center gap-8 p-4">
        <div class="h-[3ex] text-sm">
          Partecipanti 3/50
        </div>
        <div class="flex flex-row gap-2">
          <i class="cursor-pointer fa-solid fa-pen-to-square text-orange-900 text-[24px] dark:invert"></i> <!-- Edit -->
          <i @click.stop="updateClass(true)" class="cursor-pointer fa-solid fa-box-archive text-green-900 text-[24px] dark:invert"></i> <!-- Archive -->
          <i @click.stop="deleteClass" class="cursor-pointer fa-solid fa-trash-can text-rose-600 text-[24px] dark:invert"></i> <!-- Delete -->
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import { classesService as cs } from '@/servises/classes.services'

export default {
  name: 'ClassCard',
  data: function () {
    return {
      class: {
        name: '',
        img: ''
      }
    }
  },
  props: {
    classId: Number,
    name: String,
    creationDate: String,
    classImg: String
  },
  methods: {
    deleteClass () {
      this.showConfirm = false
      cs.deleteClassByID(this.classId)
    },
    updateClass (archive) {
      let obj = {}
      if (archive) {
        obj = { archived: true }
      } else {
        obj = {}
      }
      cs.updateClassByID(this.classId, obj)
        .then((response) => {
          if (response.code === 200) return response.json()
        })
        .then((json) => console.log(json))
    }
  },
  components: {},
  mounted () {}
}
</script>
