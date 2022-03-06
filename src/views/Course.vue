<template>
  <div class="overflow-y-auto overflow-x-hidden bg-[#f0f3f6] scrollbar">
    <div class="grid grid-cols-[20%,_80%] grid-rows-2 p-8 gap-8">
      <UnitsNavbar :units="units" @lessonID="getLessonID"/>
      <Video :videoID="lesson.link_video"/>
      <Quiz :quiz="lesson.quiz" :key="lesson.quiz"/>
      <VideoDescription :lessonID="lesson.id_lesson" :lessonName="lesson.name"/>
      <!-- qui le props volano tantissimo -->
    </div>
  </div>
</template>

<script>
import UnitsNavbar from '../components/Course/UnitsNavbar.vue'
import Video from '../components/Course/Video.vue'
import VideoDescription from '../components/Course/VideoDescription.vue'
import Quiz from '../components/Course/Quiz.vue'
import { lessonService as ls } from '../servises/lesson.services'
import { unitsService as us } from '../servises/units.services'

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
        quiz: {
          title: '',
          quiz: []
        }
      }
    }
  },
  computed: {
    aquiz () {
      return this.quiz
    }
  },
  components: {
    UnitsNavbar,
    Video,
    Quiz,
    VideoDescription
  },
  mounted () {
    this.fetchUnits(`?id_course=[${this.courseID}]`)
  },
  methods: {
    // fetch units by filter
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
    // fetch lessons by filter
    fetchLesson (filter) {
      ls.getLessonsByFilter(filter)
        .then((response) => {
          if (response.status === 200) return response.json()
          else { }
        })
        .then((lessonsList) => {
          this.lesson.name = lessonsList[0].name
          JSON.parse(lessonsList[0].quiz) // errore nel JSON nel db il db aggiounge un sacco di cose

          // this.lesson.quiz = JSON.parse(lessonsList[0].quiz) // questa da err
          /* console.log(this.lesson.name)
          console.log(this.lesson.quiz)
        */
        })
        .catch((ee) => {
          console.log(ee)
        })
    },
    getLessonID (id) {
      this.lessonID = id
      this.fetchLesson(`?id_lesson=[${id}]`)
      // console.log(id)
      // console.log(`?id_lesson=[${this.lessonID}]`)
    }
  }
}
</script>

<style>
</style>
