<template>
  <div class="align-middle min-w-full">
    <div class="w-full px-4 pt-1 pb-3">
      <div class="relative">
        <img :src="`data:image/png;base64,${this.currentClass.img_cover}`" alt="" class="float-left w-10 sm:w-16 h-10 sm:h-16 object-cover rounded-full">
        <div class="flex flex-col leading-tight text-3xl h-16 pl-4">
          <div class="text-2xl mt-1 flex items-center">
            <span class="text-gray-700 mr-3">{{currentClass.name}}</span>
          </div>
          <span class="text-lg text-gray-600">Partecipants: {{studentsLength + teachersLength}}</span>
          </div>
      </div>
    </div>
    <div class="place-items-center w-full mb-6 mx-3 gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
      <div class="p-2 h-96 grid-col-1 lg:w-full md:w-[75%] sm:w-[50%] bg-green-400"><p>Grafico Statistiche</p></div>
      <div class="p-2 h-96 grid-col-1 hidden lg:w-full md:block md:w-[75%] bg-green-400"><p>Grafico Statistiche</p></div>
      <div class="p-2 h-96 grid-col-1 hidden lg:w-full md:block md:w-[75%] bg-green-400"><p>Grafico Statistiche</p></div>
    </div>
    <div class="shadow overflow-hidden">
      <table class="table-fixed min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase hidden lg:[display:_table-cell]">
              Registration Date
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase hidden lg:[display:_table-cell]">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/Classes/UserCard.vue'
// import { classesService as cs } from '@/servises/classes.services'
import store from '@/store/index'
// Partecipants: {{currentClass.students.length + currentClass.teachers.length}
export default {
  name: 'Class',
  data: function () {
    return {
      currentClass: {},
      studentsLength: null,
      teachersLength: null
    }
  },
  props: {},
  methods: {
    fetchUsers (filter) {
      store.dispatch('classes/fetchClasses', `${filter}`)
        .then((response) => {
          this.currentClass = response[0]
          this.studentsLength = this.currentClass.students.length
          this.teachersLength = this.currentClass.teachers.length
        })
        .catch(() => {})
    }
  },
  components: {
    UserCard
  },
  mounted () {
    this.fetchUsers(`id=[${this.id}]`)
  },
  computed: {
    id () { return store.state.classes.id },
    img () { return store.state.classes.img },
    name () { return store.state.classes.name }
  },
  watch: {
    id (newValue, oldValue) {
      this.fetchUsers(`id=[${newValue}]`)
    },
    img (newValue, oldValue) {},
    name (newValue, oldValue) {}
  }
}
</script>

<style>
</style>
