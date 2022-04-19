<template>
  <div>
    <!-- Header -->
    <div class="flex flex-row justify-between px-8 py-4">

      <div class="flex flex-row justify-start">
        <!-- Class Image -->
        <img v-if="this.currentClass.img_cover" :src="`data:image/png;base64,${this.currentClass.img_cover}`" alt="Class Image" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full">
        <img v-else src="@/assets/img_default.png" alt="Class Image" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full">

        <!-- ClassName & Partecipats -->
        <div class="flex flex-col justify-between p-2">
          <span class="text-2xl text-gray-800 dark:text-light-text">{{currentClass.name}}</span>
          <span class="text-md text-gray-800 dark:text-light-text">Partecipants: {{studentsLength + teachersLength}}</span>
        </div>
      </div>

      <div v-if="role === 'TEACHER'" class="flex flex-row gap-2 self-center">
        <!-- Remove People Button -->
        <!-- <button class="cursor-pointer px-5 py-2.5 text-sm text-white font-medium rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none">
          Remove People
        </button> -->

        <!-- Add People Button -->
        <button class="cursor-pointer px-5 py-2.5 text-sm text-white font-medium rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          @click="showPopUp = true"
        >
          Add People
        </button>
      </div>
    </div>

    <!-- Statistics -->
    <div class="px-8 py-2 grid place-items-center gap-4 lg:grid-cols-3 sm:grid-cols-1">
      <div class="h-96 w-[75%] p-2 border-2 border-gray-200 rounded-lg lg:w-full md:block bg-white dark:bg-slate-900"><Statistics /></div>
      <div class="h-96 w-[75%] p-2 border-2 border-gray-200 rounded-lg lg:w-full md:block bg-white dark:bg-slate-900"><Statistics /></div>
      <div class="h-96 w-[75%] p-2 border-2 border-gray-200 rounded-lg lg:w-full md:block bg-white dark:bg-slate-900"><Statistics /></div>
    </div>

    <!-- Users Cards -->
    <div class="p-8 overflow-hidden">
      <!-- Teachers Cards -->
      <h1 class="py-4 px-3 text-2xl text-black font-semibold tracking-wide border-b-[2px] border-b-green-900 dark:text-light-text">Teachers</h1>
      <div class="my-4 px-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(415px,_1fr))]">
        <UserCard
          v-for="teacher in currentClass.teachers"
          :key="teacher.email"
          :email="teacher.email"
          :firstname="teacher.firstname"
          :lastname="teacher.lastname"
          :role="teacher.role"
          :registrationDate="teacher.registration_date"
          :img="teacher.img"
        />
      </div>

      <!-- Students Cards -->
      <h1 class="py-4 px-3 text-2xl text-black font-semibold tracking-wide border-b-[2px] border-b-green-900 dark:text-light-text">Students</h1>
      <div class="my-4 px-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(415px,_1fr))]">
        <UserCard
          v-for="student in currentClass.students"
          :key="student.email"
          :email="student.email"
          :firstname="student.firstname"
          :lastname="student.lastname"
          :role="student.role"
          :registrationDate="student.registration_date"
          :img="student.img"
      />
      </div>
    </div>

    <InvitePopUp
      v-if="showPopUp"
      :classId="id"
      @hide="showPopUp = false"
    />
  </div>
</template>

<script>
import UserCard from '@/components/Classes/UserCard.vue'
import Statistics from '@/components/Classes/Statistics.vue'
import InvitePopUp from '@/components/Classes/InvitePopUp.vue'
// import { classesService as cs } from '@/servises/classes.services'
import store from '@/store/index'

export default {
  name: 'Class',
  data: function () {
    return {
      currentClass: {},
      studentsLength: null,
      teachersLength: null,
      showPopUp: false
    }
  },
  props: {},
  methods: {
    fetchUsers (filter) {
      store.dispatch('classes/fetchClassbyID', filter)
        .then((response) => {
          if (!response) {
            console.log('pagina di errore')
            return
          }
          this.currentClass = response
          this.studentsLength = this.currentClass.students.length
          this.teachersLength = this.currentClass.teachers.length
        })
        .catch(() => {})
    },
    fetchClasses () {
      store.dispatch('classes/fetchMyClasses', '')
        .then((response) => {
          if (!response[0]) {
            console.log('pagina di errore')
            return
          }
          store.dispatch('classes/setCurrentClass', response[0].id)
          this.currentClass = response[0]
          this.studentsLength = this.currentClass.students.length
          this.teachersLength = this.currentClass.teachers.length
        })
    }
  },
  components: {
    UserCard,
    Statistics,
    InvitePopUp
  },
  mounted () {
    if (this.role === 'STUDENT') this.fetchClasses()
    else this.fetchUsers(this.id)
  },
  computed: {
    id () { return store.state.classes.id },
    img () { return store.state.classes.img },
    name () { return store.state.classes.name },
    role () { return store.state.login.role }
  },
  watch: {
    id () {
      this.fetchUsers(this.id)
    }
  }
}
</script>

<style>
</style>
