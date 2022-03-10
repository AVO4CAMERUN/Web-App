<template>
  <div class="overflow-y-auto overflow-x-hidden bg-[#f0f3f6] scrollbar max-h-[calc(100vh_-_76px)]">
    <div class="grid lg:grid-cols-[80%,_20%] p-8 gap-4">
      <Video :videoID="lesson.link_video"/>
      <UnitsSidebar v-if="units.length !== 0" :units="units" :ulength="units.length" @lessonID="getLessonID"/>
      <Quiz :quiz="lesson.quiz" :key="lesson.quiz"/>
      <VideoDescription :lessonID="lesson.id_lesson" :lessonName="lesson.name"/>
      <!-- Forse le props non volano anche se secondo me adrebbero fatte volare perche manca saclabilita -->
    </div>
  </div>
</template>

<script>
import UnitsSidebar from '@/components/Course/UnitsSidebar.vue'
import Video from '@/components/Course/Video.vue'
import VideoDescription from '@/components/Course/VideoDescription.vue'
import Quiz from '@/components/Course/Quiz.vue'
import { lessonService as ls } from '@/servises/lesson.services'
import { unitsService as us } from '@/servises/units.services'

export default {
  name: 'course',
  data: function () {
    return {
      units: [],
      courseID: this.$route.query.id,
      lessonID: null,
      lesson: {
        name: '',
        creation_date: '',
        link_video: '',
        quiz: {
          title: '',
          quiz: []
        }
      }
    }
  },
  methods: {
    fetchUnits (filter) {
      us.getUnitsByFilter(filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((fetchUnit) => {
          //
          this.units = []
          fetchUnit.forEach(unit => {
            this.units.push({
              unitID: unit.id_unit,
              courseID: unit.id_course,
              unitName: unit.name,
              unitPosition: unit.units_order,
              unitDescription: unit.description,
              unitLessons: unit.lessons
            })
          })
          // cambiare in ordine lezioni dinamico
          this.lessonID = this.units[0].unitLessons[0].id
          this.fetchLesson(`?id_lesson=[${this.lessonID}]`)
        })
        .catch(() => {})
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
      this.fetchLesson(`?id_lesson=[${id}]`)
    }
  },
  mounted () {
    this.fetchUnits(`?id_course=[${this.courseID}]`)
  },
  components: {
    UnitsSidebar,
    Video,
    Quiz,
    VideoDescription
  }
}
</script>

<style>
</style>
