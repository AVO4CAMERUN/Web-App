<template>
  <!-- Header -->
  <div class="flex flex-row gap-2 m-8 mb-2 p-2">
    <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
    <p class="text-green-800 text-xl font-semibold grow-0">My Class</p>
    <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
  </div>

  <div v-if="empty" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold"> {{empty ? 'Not Found' : ''}}</p>
    <p class="text-sm">{{empty ? 'You are not in any class. Ask a teacher of the class to invite you' : ''}}</p>
  </div>
  <div v-else>
    <!-- Header -->
    <div class="flex flex-row justify-between px-8 py-4">

      <div class="flex flex-row justify-start">
        <!-- Class Image -->
        <img v-if="this.currentClass.img_cover" :src="`data:image/png;base64,${this.currentClass.img_cover}`" alt="Class Image" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full">
        <img v-else src="@/assets/img_default.png" alt="Class Image" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full">

        <!-- ClassName & Partecipats -->
        <div class="flex flex-col justify-between p-2">
          <span class="text-2xl text-gray-800 dark:text-light-text notranslate">{{currentClass.name}}</span>
          <span class="text-md text-gray-800 dark:text-light-text">Partecipants: {{studentsLength + teachersLength}}</span>
        </div>
      </div>

      <div v-if="role === 'TEACHER'" class="flex flex-row gap-2 self-center">
        <!-- Remove People Button -->
        <button class="cursor-pointer px-5 py-2.5 text-sm text-white font-medium rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
          @click="toggleRemove = !toggleRemove; tmpDeletedUsers = []"
        >
          {{!toggleRemove ? 'Remove Users' : 'Discard changes'}}
        </button>
        <!-- Confirm elimination Button -->
        <button v-if="toggleRemove" class="cursor-pointer px-5 py-2.5 text-sm text-white font-medium rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none"
          @click="removeUsers"
        >
          Confirm removing
        </button>

        <!-- Add People Button -->
        <button class="px-5 py-2.5 text-sm text-white font-medium rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :class="toggleRemove ? 'cursor-not-allowed' : 'cursor-pointer'"
          @click="showPopUp = true"
          :disabled="toggleRemove"
        >
          Add People
        </button>
      </div>
    </div>

    <!-- Statistics -->
    <!--div class="px-8 py-2 grid place-items-center gap-4 lg:grid-cols-3 sm:grid-cols-1">
      <div class="h-96 w-[75%] p-2 border-2 border-gray-200 rounded-lg lg:w-full md:block bg-white dark:bg-slate-900"><Statistics nomeCorso="Work In Progress" /></div>
      <div class="h-96 w-[75%] p-2 border-2 border-gray-200 rounded-lg lg:w-full md:block bg-white dark:bg-slate-900"><Statistics nomeCorso="Work In Progress" /></div>
      <div class="h-96 w-[75%] p-2 border-2 border-gray-200 rounded-lg lg:w-full md:block bg-white dark:bg-slate-900"><Statistics nomeCorso="Work In Progress" /></div>
    </div-->

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
          :img="teacher.img_profile"
        />
      </div>

      <!-- Students Cards -->
      <h1 class="py-4 px-3 text-2xl text-black font-semibold tracking-wide border-b-[2px] border-b-green-900 dark:text-light-text">Students</h1>
      <div class="my-4 px-2 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(415px,_1fr))]">
        <UserCard
          v-for="student in currentClass.students"
          v-show ="isRemoved(student.email)"
          :key="student.email"
          :email="student.email"
          :firstname="student.firstname"
          :lastname="student.lastname"
          :role="student.role"
          :remove="toggleRemove"
          :registrationDate="student.registration_date"
          :img="student.img_profile"
          @email="addTmpRemove"
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
// import Statistics from '@/components/Classes/Statistics.vue'
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
      showPopUp: false,
      empty: true,
      toggleRemove: false,
      tmpDeletedUsers: []
    }
  },
  props: {},
  methods: {
    fetchUsers (filter) {
      store.dispatch('classes/fetchClassbyID', filter)
        .then((response) => {
          if (!response) {
            return
          }
          this.empty = false
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
            this.empty = true
            return
          }
          this.empty = false
          store.dispatch('classes/setCurrentClass', response[0].id)
          this.currentClass = response[0]
          this.studentsLength = this.currentClass.students.length
          this.teachersLength = this.currentClass.teachers.length
        })
    },
    addTmpRemove (email) {
      const i = this.tmpDeletedUsers.findIndex(e => e === email)
      if (i === -1) this.tmpDeletedUsers.push(email)
    },
    isRemoved (email) {
      const i = this.tmpDeletedUsers.findIndex(e => e === email)
      if (i === -1) return true
      return false
    },
    removeUsers () {
      this.toggleRemove = !this.toggleRemove
      // gabbo sei inutile
    }
  },
  components: {
    UserCard,
    // Statistics,
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
