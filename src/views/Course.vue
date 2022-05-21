<template>
  <div
    v-if="units.length !== 0 || edit"
    class="grid lg:grid-cols-[80%,_20%] p-8 gap-4"
  >
    <!-- <p class="py-4 bg-primary text-white text-center text-3xl rounded-md col-span-full">{{ name }}</p> -->

    <!-- Video Component -->
    <Video
      :lesson="lesson"
      :edit="edit"
    />

    <!-- Units Sidebar Component -->
    <UnitsSidebar
      v-if="fetched"
      :edit="edit"
      :units="units"
      @lessonID="getLessonID"
      @newUnit="addNewUnit"
      @deletedUnit="removeUnit"
      @updatedUnit="updateUnit"
      @deletedLesson="removeLesson"
      @newLesson="addNewLesson"
      @updatedLesson="updateLesson"
    />

    <!-- Quiz Component -->
    <Quiz
      :quiz="lesson?.quiz"
      :edit="edit"
    />

    <!-- Description Component -->
    <VideoDescription
      v-if="false"
      :lesson="lesson"
    />

  </div>
  <div v-else> Non c'è nulla da vedere qui, procedere </div>
</template>

<script>
import UnitsSidebar from '@/components/Course/UnitsSidebar.vue'
import Video from '@/components/Course/Video.vue'
import VideoDescription from '@/components/Course/VideoDescription.vue'
import Quiz from '@/components/Course/Quiz.vue'
import { lessonService as ls } from '@/servises/lesson.services'
import { unitsService as us } from '@/servises/units.services'
import store from '@/store/index'

export default {
  name: 'course',
  data: function () {
    return {
      edit: false,
      units: [],
      lessonID: null,
      lesson: {},
      fetched: false // flag to render units component only when finished fetching
    }
  },
  methods: {
    fetchUnits (filter) {
      us.getUnitsByFilter(filter)
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((fetchUnit) => {
          this.units = fetchUnit
          // sort units by sequence number
          this.units.sort((a, b) => a.seqNumber - b.seqNumber)
          this.fetched = true

          // cambiare in ordine lezioni dinamico
          if (this.units[0]?.lesson[0] !== undefined) {
            this.lessonID = this.units[0].lesson[0].id_lesson
            this.fetchLesson(`id_lesson=["${this.lessonID}"]`)
          }
        })
    },
    fetchLesson (filter) {
      ls.getLessonsByFilter(filter)
        .then((response) => {
          if (response.status === 200) return response.json()
          else { }
        })
        .then((lessonsList) => {
          // Update lesson
          this.lesson = lessonsList[0]

          // if it's not defined assign empty obj
          if (lessonsList[0].quiz !== '') this.lesson.quiz = JSON.parse(lessonsList[0].quiz)
          else this.lesson.quiz = null
        })
        .catch((ee) => {
          console.log(ee) // fare popup errore
        })
    },
    getLessonID (id) {
      this.lessonID = id
      this.fetchLesson(`id_lesson=["${id}"]`)
    },
    addNewUnit (unit) {
      this.units.push(unit)
    },
    removeUnit (id) {
      const i = this.units.findIndex(unit => unit.id_unit === id)
      this.units.splice(i, 1)
    },
    updateUnit (newUnit) {
      const i = this.units.findIndex(unit => unit.id_unit === newUnit.id_unit)
      this.units[i].name = newUnit.name
      this.units.sort((a, b) => a.seqNumber - b.seqNumber)
    },
    removeLesson (idLesson, idUnit) {
      const i = this.units.findIndex(unit => unit.id_unit === idUnit)
      const k = this.units[i].lesson.findIndex(lesson => lesson.id_lesson === idLesson)
      this.units[i].lesson.splice(k, 1)
    },
    addNewLesson (lesson, idUnit) {
      const i = this.units.findIndex(unit => unit.id_unit === idUnit)
      this.units[i].lesson.push(lesson)
    },
    updateLesson (newLesson, idUnit) {
      const i = this.units.findIndex(unit => unit.id_unit === idUnit)
      const j = this.units[i].lesson.findIndex(lesson => lesson.id_lesson === newLesson.id_lesson)
      this.units[i].lesson[j].name = newLesson.name
    }
  },
  computed: {
    id () { return store.state.course.id },
    img () { return store.state.course.img },
    name () { return store.state.course.name },
    emailCreator () { return store.state.course.creator }
  },
  mounted () {
    // check query string and if you are the course's creator to enable editing
    if (this.$route.query.edit === 'on' && this.emailCreator === store.state.login.email) this.edit = true
    this.fetchUnits(`id_course=["${this.id}"]`)
  },
  components: {
    UnitsSidebar,
    Video,
    Quiz,
    VideoDescription
  }
}
</script>
