<template>
  <div class="flex flex-col justify-center">
    <!-- Header -->
    <div class="flex flex-row gap-2 m-8 mb-2 p-2">
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
      <p class="text-green-800 text-xl font-semibold grow-0">Created Classes</p>
      <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
    </div>

    <!-- Class Grid -->
    <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
      <component
        :is="userClass.id === classToEdit ? 'CreateClassCard' : 'ClassCard'"
        v-for="(userClass, index) in classesCards"
        :key="userClass.id"
        :groupClass="userClass"
        :parent="'mycreations'"
        :participants="participants[index]"
        @removeCard="showPopUp"
        @setEdit="setClassEdit"
        @newClass="addClassCard"
      />

      <!-- Class Creation Card -->
      <CreateClassCard
        @newClass="addClassCard"
      />
    </div>

    <!-- Confirm Elimination Pop Up -->
    <PopUp
      v-if="showConfirm"
      @noAction="showConfirm = false"
      @doAction="doAction"
      :type="'confirm'"
      :message="'Warning'"
      :content="`Are you sure you want to delete this ${popUpContent}?`"
    />
  </div>
</template>

<script>
import ClassCard from '@/components/Classes/ClassCard.vue'
import CreateClassCard from '@/components/Classes/CreateClassCard.vue'
import PopUp from '@/components/Base/PopUp.vue'
import { classesService as cls } from '@/servises/classes.services'
import store from '@/store/index'

export default {
  name: 'MyCreations',
  data: function () {
    return {
      classToEdit: null,
      cardToRemove: {},
      showConfirm: false,
      classesCards: [],
      popUpContent: ''
    }
  },
  components: {
    CreateClassCard,
    ClassCard,
    PopUp
  },
  mounted () {
    // Fetch my classes
    this.fetchClasses()
  },
  methods: {
    // Classes Actions
    fetchClasses () { // Fetch
      store.dispatch('classes/fetchMyClasses', '')
        .then((response) => {
          this.classesCards = response
          if (this.classesCards === undefined || this.classesCards?.length === 0) return
          this.classesCards.forEach(c => {
            const date = new Date(c.creation_date)
            c.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
        })
    },
    setClassEdit (id) { // Set Edit Mode
      if (this.classToEdit === null || id === null) this.classToEdit = id
    },
    deleteClass () { // Delete
      this.showConfirm = false
      cls.deleteClassByID(this.cardToRemove.id)
        .then((response) => {
          if (response?.status === 200) {
            const index = this.classesCards.findIndex((grouoClass) => grouoClass.id === this.cardToRemove.id)
            this.classesCards.splice(index, 1)
            if (this.classesCards.length <= 0) this.empty = true
            else this.empty = false
          }
          this.cardToRemove = {}
        })
    },
    addClassCard (classID) { // Add Card
      this.classToEdit = null
      this.fetchClasses()
    },

    // Pop UP Actions
    showPopUp (obj) { // Show
      this.popUpContent = `${obj.type} (${obj.name})`
      this.cardToRemove = obj
      this.showConfirm = true
    },
    doAction () { // Action
      this.deleteClass()
    }
  },
  computed: {
    role () { return store.state.login.role },
    participants () {
      const part = []
      this.classesCards.forEach(e => {
        part.push(e.teachers.length + e.students.length)
      })
      return part
    }
  }
}
</script>
