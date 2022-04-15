<template>
  <!-- Main -->
  <div class="flex flex-nowrap" @click="setCurrentClass">
    <article class="w-[480px] cursor-pointer bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="border h-[200px] relative">
        <img
          v-if="groupClass.img_cover !== '' && groupClass.img_cover != null"
          :src="`data:image/png;base64,${groupClass.img_cover}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="@/assets/img_default.png" draggable="false">
      </div>

      <!-- Header -->
      <header class="flex flex-row items-center justify-between leading-tight p-4">

        <!-- Name -->
        <h1 class="overflow-hidden text-black text-xl font-bold capitalize dark:text-white">
          {{groupClass.name}}
        </h1>

        <!-- Creation Date -->
        <div class="text-sm self-start pt-[4px] dark:text-white">
          {{groupClass.creation_date}}
        </div>
      </header>

      <!-- Description -->
      <p class="h-[9ex] w-[calc(100%_-_2rem)] m-2 mx-4 break-words overflow-hidden text-sm dark:text-white" :class="groupClass.description === null ? 'text-slate-700' : ''">
        {{groupClass.description === null || groupClass.description === '' || !groupClass.description ? 'no description provided' : groupClass.description}}
      </p>

      <!-- Footer -->
      <footer class="flex flex-row justify-between items-center gap-8 p-4">

        <!-- Participants -->
        <div class="text-sm">
          Participants {{participants}}
        </div>

        <!-- Buttons -->
        <div v-if="parent === 'mycreations'" class="flex flex-row gap-2">
          <i @click.stop="this.$emit('setEdit', groupClass.id)" class="cursor-pointer bx bx-edit text-black text-[32px] dark:invert"></i> <!-- Edit -->
          <i @click.stop="updateClass()" class="cursor-pointer bx bx-box text-green-900 text-[32px] dark:invert"></i> <!-- Archive -->
          <!-- <i @click.stop="updateClass()" class="cursor-pointer bx bxs-box text-green-900 text-[32px] dark:invert"></i> -->
          <i @click.stop="deleteClass" class="cursor-pointer bx bx-trash text-rose-600 text-[32px] dark:invert"></i> <!-- Delete -->
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import router from '@/router/index'
import store from '@/store/index'
import { classesService as cs } from '@/servises/classes.services'

export default {
  name: 'ClassCard',
  data: function () {
    return {}
  },
  props: ['groupClass', 'participants', 'parent'],
  methods: {
    deleteClass () {
      this.$emit('removeCard', { id: this.groupClass.id, type: 'class' })
    },
    updateClass () {
      const obj = { archived: !this.groupClass.archived }
      cs.updateClassByID(this.groupClass.id, obj)
        .then((response) => {
          if (response.code === 200) return response.json()
        })
    },
    setCurrentClass (id) {
      store.dispatch('classes/setCurrentClass', this.groupClass.id)
        .then(() => {
          if (this.parent !== 'mycreations') router.push({ name: 'class' })
          else router.push({ name: 'class', query: { edit: 'on' } })
        })
    }
  },
  components: {},
  mounted () {}
}
</script>
