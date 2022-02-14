<template>
  <div class="overflow-auto bg-[#f0f3f6] scrollbar h-[100vh]">
    <div class="grid grid-cols-[20%,_auto] grid-rows-[minmax(10rem,_88vh),_minmax(10rem,_88vh)] p-8 gap-8">
      <Navbar />
      <VideoDescription/>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/UnitsNavbar.vue'
// import Video from '../components/Video.vue'
import VideoDescription from '../components/VideoDescription.vue'
// import { lessonService as ls } from '../servises/lesson.service'
import { unitsService as us } from '../servises/units.service'

export default {
  name: 'course',
  data: function () {
    return {
      units: [],
      lessons: []
    }
  },
  components: {
    Navbar,
    // Video,
    VideoDescription
  },
  mounted () {
    this.units = this.fetchUnits(`?id_course=[${1}]`)
    // this.fetchLesson(`?id_lesson=[${1}]`)
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
    }
    /* fetch lessons by filter
    fetchLesson (filter) {
      ls.getLessonsByFilter(filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else { }
        })
        .then((lessonsList) => {
          console.log(lessonsList)
          this.lessons = []
          lessonsList.forEach(lesson => {
            this.lessons.push({
              lessonID: lesson.id_unit,
              unitID: lesson.id_unit,
              lessonName: lesson.name,
              lessonVideo: lesson.link_video,
              lessonQuiz: lesson.quiz
            })
          })
        })
        .catch(() => {})
    } */
  }
}
</script>

<style>
</style>
