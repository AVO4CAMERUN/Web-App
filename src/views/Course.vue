<template>
  <div class="overflow-y-auto overflow-x-hidden bg-[#f0f3f6] scrollbar">
    <div class="grid grid-cols-[20%,_80%] grid-rows-2 p-8 gap-8">
      <Navbar :units="units" @lessonID="getLessonID"/>
      <Video :videoID="lesson.link_video"/>
      <VideoDescription :lessonID="lesson.id_lesson" :lessonName="lesson.name" :lessonQuiz="lesson.quiz"/>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/UnitsNavbar.vue'
import Video from '../components/Video.vue'
import VideoDescription from '../components/VideoDescription.vue'
import { lessonService as ls } from '../servises/lesson.service'
import { unitsService as us } from '../servises/units.service'

export default {
  name: 'course',
  data: function () {
    return {
      units: [],
      lesson: {},
      lessonID: 1,
      courseID: this.$route.query.id
    }
  },
  components: {
    Navbar,
    Video,
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
          if (response.status === 200) {
            return response.json()
          } else { }
        })
        .then((lessonsList) => {
          this.lesson = lessonsList[0]
        })
        .catch(() => {})
    },
    getLessonID (id) {
      this.lessonID = id
      this.fetchLesson(`?id_lesson=[${this.lessonID}]`)
    }
  }
}
</script>

<style>
</style>
