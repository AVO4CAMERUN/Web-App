<template>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <InscriptionsCard
      v-for="(card) in cards"
      :key="card.id"
      :courseID="card.courseID"
      :courseName="card.courseName"
      :courseDescription="card.courseDescription"
      :courseCover="card.courseCover"
      :creatorName="card.creatorName"
      :creationDate="card.creationDate"
      @courseID="removeCourseCard"
      @click="setCurrentCourse(card.courseID)"
    />
    <CreateCourseCard v-if="role == 'TEACHER'"/>
  </div>
</template>
<script>
import InscriptionsCard from '@/components/Course/InscriptionsCard.vue'
import CreateCourseCard from '@/components/Course/CreateCourseCard.vue'
import store from '@/store/index'

export default {
  name: 'MyCreations',
  data: function () {
    return {
      cards: []
    }
  },
  components: {
    CreateCourseCard,
    InscriptionsCard
  },
  mounted () {
    this.fetchMyCreations(`?email_creator=[${store.state.login.email}]`)
  },
  methods: {
    fetchMyCreations (filter) {
      store.dispatch('course/fetchCourses', filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 404) {
            this.empty = true
            return 1
          }
        })
        .then((coursesList) => {
          let ids = ''; coursesList.forEach(c => { ids += c.id_course + ',' })
          ids = ids.substring(0, ids.length - 1)
          // return cs.getCoursesByFilter(`?id_course=[${ids}]`)
          return store.dispatch('course/fetchCourses', `?id_course=[${ids}]`)
        })
        .then((courses) => {
          this.cards = []
          courses.forEach(course => {
            const date = new Date(course.creation_date)
            this.cards.push({
              courseID: course.id_course,
              courseName: course.name,
              courseDescription: course.description,
              creatorName: course.email_creator,
              courseCover: course.img_cover,
              creationDate: `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
            })
          })
          if (this.cards.length <= 0) this.empty = true
          else this.empty = false
        })
        .catch(() => {})
    },
    removeCourseCard (courseID) {
      const index = this.cards.findIndex((course) => course.courseID === courseID)
      this.cards.splice(index, 1)
      if (this.cards.length <= 0) this.empty = true
      else this.empty = false
    },
    setCurrentCourse (id) {
      store.dispatch('course/setCurrentCourse', id)
    }
  },
  computed: {
    role () { return store.state.login.role }
  }
}
</script>
