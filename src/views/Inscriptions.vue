<template>
  <div v-if="empty" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Nessun corso aggiunto</p>
    <p class="text-sm">Vai nella sezione Esplora per inserire il tuo primo corso.</p>
  </div>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <CourseCard
      v-for="(card) in cards"
      :key="card.id"
      :courseID="card.id_course"
      :courseName="card.name"
      :courseDescription="card.description"
      :courseCover="card.img_cover"
      :creatorName="card.email_creator"
      :creationDate="card.creation_date"
      :courseSubject="card.subject"
      :parent="'inscriptions'"
      @courseID="removeCourseCard"
    />
  </div>
</template>
<script>
import CourseCard from '@/components/Course/CourseCard.vue'
import { subscribeService as ss } from '@/servises/subscribe.service'
import store from '@/store/index'

export default {
  name: 'Inscriptions',
  data: function () {
    return {
      cards: [],
      empty: false
    }
  },
  components: {
    CourseCard
  },
  mounted () {
    this.fetchInscriptions(`?email=["${store.state.login.email}"]`)
  },
  methods: {
    fetchInscriptions (filter) {
      ss.getSubscriptionByFilter(filter, store.state.login.accessToken)
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
          this.cards = courses
          this.cards.forEach(card => {
            const date = new Date(card.creation_date)
            card.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
          if (this.cards.length <= 0) this.empty = true
          else this.empty = false
        })
        .catch(() => {})
    },
    removeCourseCard (courseID) {
      const index = this.cards.findIndex((card) => card.id_course === courseID)
      this.cards.splice(index, 1)
      if (this.cards.length <= 0) this.empty = true
      else this.empty = false
    }
  },
  computed: {
    role () { return store.state.login.role }
  }
}
</script>
