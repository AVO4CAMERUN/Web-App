<template>
  <!-- Main -->
  <div class="flex flex-nowrap">
    <article class="w-[480px] cursor-pointer bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="border h-[200px] relative">
        <img
          v-if="classImg !== '' && classImg != null"
          :src="`data:image/png;base64,${classImg}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="@/assets/img_default.png" draggable="false">
      </div>

      <!-- Header -->
      <header class="flex flex-row items-center justify-between leading-tight p-4">

        <!-- Name -->
        <h1 class="overflow-hidden text-black text-xl font-bold capitalize dark:text-white">
          {{name}}
        </h1>

        <!-- Creation Date -->
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{creationDate}}
        </div>
      </header>

      <!-- Description -->
      <p class="h-[9ex] w-[calc(100%_-_2rem)] m-2 mx-4 break-words overflow-hidden text-sm dark:text-white" :class="description === null ? 'text-slate-700' : ''">
        {{description === null || description === '' ? 'no description provided' : description}}
      </p>

      <!-- Footer -->
      <footer class="flex flex-row justify-between items-center gap-8 p-4">

        <!-- Participants -->
        <div class="h-[3ex] text-sm">
          Participants {{participants}}
        </div>

        <!-- Buttons -->
        <div v-if="parent === 'mycreations'" class="flex flex-row gap-2">
          <i @click.stop="this.$emit('setEdit', classId)" class="cursor-pointer bx bx-edit text-black text-[32px] dark:invert"></i> <!-- Edit -->
          <i @click.stop="updateClass()" class="cursor-pointer fa-solid fa-box-archive text-green-900 text-[32px] dark:invert"></i> <!-- Archive -->
          <i @click.stop="deleteClass" class="cursor-pointer bx bx-trash text-rose-600 text-[32px] dark:invert"></i> <!-- Delete -->
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
    return {}
  },
  props: ['classId', 'name', 'creationDate', 'classImg', 'participants', 'description', 'archived', 'parent'],
  methods: {
    deleteClass () {
      this.showConfirm = false
      cs.deleteClassByID(this.classId)
    },
    updateClass () {
      const obj = { archived: !this.archived }
      cs.updateClassByID(this.classId, obj)
        .then((response) => {
          if (response.code === 200) return response.json()
        })
    }
  },
  components: {},
  mounted () {}
}
</script>
