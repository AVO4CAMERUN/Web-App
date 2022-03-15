<template>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
    <MyCourseCard
      v-for="card in cards"
      :key="card.id"
      :courseID="card.courseID"
      :courseName="card.courseName"
      :courseDescription="card.courseDescription"
      :courseCover="card.courseCover"
      :creatorName="card.creatorName"
      :creationDate="card.creationDate"
      @courseID="removeCourseCard"
    />
  </div>
  <div v-if="cempty" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Nessun corso aggiunto</p>
    <p class="text-sm">Vai nella sezione Esplora per inserire il tuo primo corso.</p>
  </div>
</template>
<script>
import MyCourseCard from '@/components/Course/MyCourseCard.vue'
import { subscribeService as ss } from '@/servises/subscribe.service'
import { coursesService as cs } from '@/servises/course.services'
import store from '@/store/index'

export default {
  name: 'mycourses',
  data: function () {
    return {
      cards: [],
      empty: false
    }
  },
  components: {
    MyCourseCard
  },
  mounted () {
    this.fetchMyCourses(`?email=[${store.state.login.email}]`)
  },
  methods: {
    fetchMyCourses (filter) {
      ss.getSubscriptionByFilter(filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((coursesList) => {
          let ids = ''; coursesList.forEach(c => { ids += c.id_course + ',' })
          return cs.getCoursesByFilter(`?id_course=[${ids}]`)
        })
        .then((response) => response.json())
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
          // if (this.cards.length <= 0) this.empty = true
          // else this.empty = false
        })
        .catch(() => {})
    },
    removeCourseCard (courseID) {
      const index = this.cards.findIndex((course) => course.courseID === courseID)
      this.cards.splice(index, 1)
    }
  },
  computed: {
    cempty () {
      if (this.cards.length <= 0) return true
      else return false
    }
  }
}
</script>
