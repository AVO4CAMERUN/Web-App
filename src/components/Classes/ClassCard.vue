<template>
  <div class="flex flex-nowrap">
    <div class="cursor-pointer h-full w-full bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">
      <div class="border border-black h-[200px] relative">
        <img
          v-if="classImg !== ''"
          :src="`data:image/png;base64,${classImg}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="https://picsum.photos/400/300" draggable="false">
      </div>

      <!-- toggle class 'justify-center' on edit mode (sostituisce justify-between) -->
      <!-- toggle class 'p-4' on edit mode (sostituisce p-8) -->
      <header class="flex flex-row items-center justify-between leading-tight p-8">
        <!-- on edit mode disappear name and creation date -->
        <h1 class="overflow-hidden text-black text-xl font-bold capitalize dark:text-white">{{name}}</h1>
        <!-- <h1>
          <input
            type="text"
            class="center text-black text-2xl font-bold capitalize border-b-2 border-gray-300 lg:whitespace-nowrap focus:outline-none dark:bg-slate-900 dark:text-white"
            placeholder="change name"
          >
        </h1> -->
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{creationDate}}
        </div>
      </header>

      <footer class="flex flex-row justify-center items-center gap-8 p-4">
        <div class="flex flex-row gap-2">
          <i class="cursor-pointer fa-solid fa-pen-to-square text-orange-900 text-[24px] dark:invert"></i>
          <i class="cursor-pointer fa-solid fa-box-archive text-green-900 text-[24px] dark:invert"></i>
          <i @click.prevent="deleteClass" class="cursor-pointer fa-solid fa-trash-can text-rose-600 text-[24px] dark:invert"></i> <!-- Delete -->
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { classesService as cs } from '@/servises/classes.services'

export default {
  name: 'ClassCard',
  data: function () {
    return {}
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
    }
  },
  components: {},
  mounted () {}
}
</script>
