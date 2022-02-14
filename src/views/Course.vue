<template>
  <div class="overflow-y-auto overflow-x-hidden bg-[#f0f3f6] scrollbar">
    <div class="grid grid-cols-[20%,80%] grid-rows-[90%,90%] p-8 gap-8">
      <Navbar :units="units"/>
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
// import { unitsService as us } from '../servises/units.service'

export default {
  name: 'course',
  data: function () {
    return {
      units: [],
      lesson: {}
    }
  },
  components: {
    Navbar,
    Video,
    VideoDescription
  },
  mounted () {
    // this.units = this.fetchUnits(`?id_course=[${1}]`)
    this.fetchLesson(`?id_lesson=[${1}]`)
  },
  methods: {
    /* fetch units by filter
    fetchUnits (filter) {
      us.getUnitsByFilter(filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((fetchUnit) => {
          console.log(fetchUnit)
          //
          this.units = []
          fetchUnit.forEach(unit => {
            this.units.push({
              unitID: unit.id_unit,
              courseID: unit.id_course,
              unitName: unit.name,
              unitDescription: unit.description,
              unitLessons: unit.lessons
            })
          })
        })
        .catch(() => {})
    } */
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
    }
  }
}
</script>

<style>
</style>
