<template>
  <!-- Main -->
  <div class="flex flex-nowrap notranslate" @click="setCurrentClass">
    <article class="w-[480px] cursor-pointer bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">

      <!-- Image -->
      <div class="h-[200px] relative flex flex-row justify-end" :class="groupClass.archived ? 'opacity-25' : ''">
        <img
          v-if="groupClass.img_cover !== '' && groupClass.img_cover != null"
          :src="`data:image/png;base64,${groupClass.img_cover}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="@/assets/img_default.png" draggable="false">
      </div>

      <!-- Header -->
      <header class="flex flex-row items-center justify-between leading-tight p-4" :class="groupClass.archived ? 'opacity-25' : ''">

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
      <p class="h-[9ex] w-[calc(100%_-_2rem)] m-2 mx-4 break-words overflow-hidden text-sm dark:text-white"
        :class="[groupClass.description === undefined || groupClass.description === '' ? 'text-slate-700 translate' : '', groupClass.archived ? 'opacity-25' : '']"
      >
        {{groupClass.description === undefined || groupClass.description === '' || !groupClass.description ? 'no description provided' : groupClass.description}}
      </p>

      <!-- Footer -->
      <footer class="flex flex-row justify-between items-center gap-8 p-4">

        <!-- Participants -->
        <div class="text-sm dark:invert" :class="groupClass.archived === true ? 'opacity-25' : ''">
          Participants {{participants}}
        </div>

        <!-- Buttons -->
        <div v-if="parent === 'mycreations'" class="flex flex-row gap-2">
          <i @click.stop="this.$emit('setEdit', groupClass.id)" class="cursor-pointer bx bx-edit text-black text-[32px] dark:invert" :class="groupClass.archived ? 'opacity-25' : ''" /> <!-- Edit -->
          <i @click.stop="updateClass()" class="cursor-pointer bx text-green-900 text-[32px] dark:invert" :class="groupClass.archived ? 'bxs-box' : 'bx-box'"/> <!-- Archive -->
          <i @click.stop="deleteClass" class="cursor-pointer bx bx-trash text-rose-600 text-[32px]" :class="groupClass.archived === true ? 'opacity-25' : ''" /> <!-- Delete -->
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
      this.$emit('removeCard', { id: this.groupClass.id, type: 'class', name: this.groupClass.name })
    },
    updateClass () {
      const obj = { archived: !this.groupClass.archived }
      cs.updateClassByID(this.groupClass.id, obj)
        .then((response) => {
          if (response.status === 200) this.$emit('newClass', this.groupClass.id)
        })
    },
    setCurrentClass () {
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
