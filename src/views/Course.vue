<template>
  <div v-if="units.length !== 0 || edit" class="grid lg:grid-cols-[80%,_20%] p-8 gap-4">
    <!-- <p class="py-4 bg-primary text-white text-center text-3xl rounded-md col-span-full">{{ name }}</p> -->

    <!-- Video Component -->
    <Video
      :videoID="lesson.link_video"
      :courseName="name"
    />

    <!-- Units Sidebar Component -->
    <UnitsSidebar
      :edit="edit"
      :units="units"
      :ulength="units.length"
      @lessonID="getLessonID"
      @newUnit="addNewUnit"
    />

    <!-- Quiz Component -->
    <Quiz
      :quiz="lesson.quiz"
      :key="lesson.quiz"
    />

    <!-- Descriptio Component -->
    <VideoDescription
      :lessonID="lesson.id_lesson"
      :lessonName="lesson.name"
    />
  </div>
  <div v-else>oh no douma ha sfasciato tutto 🤡</div>
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
          if (response.status === 200) return response.json()
        })
        .then((fetchUnit) => {
          this.units = fetchUnit
          // cambiare in ordine lezioni dinamico
          if (this.units[0].lesson[0] !== undefined) {
            this.lessonID = this.units[0].lesson[0].id_lesson
            this.fetchLesson(`?id_lesson=["${this.lessonID}"]`)
          }
        })
    },
    fetchLesson (filter) {
      ls.getLessonsByFilter(filter, store.state.login.accessToken)
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
      this.fetchLesson(`?id_lesson=["${id}"]`)
    },
    addNewUnit (unit) {
      this.units.push(unit)
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
