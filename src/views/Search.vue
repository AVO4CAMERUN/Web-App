<template>
  <!-- Header -->
  <div class="flex flex-row gap-2 m-8 mb-2 p-2">
    <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
    <p class="text-green-800 text-xl font-semibold grow-0">Search Courses</p>
    <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
  </div>

  <BaseSearchBar @inputSearch="searchCourses"/>
  <!-- Error message when course already added
  <div v-if="error == 400" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Hai già aggiunto questo corso</p>
    <p class="text-sm">Vai nella sezione I Miei Corsi per iniziare a seguirlo.</p>
  </div> -->
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <CourseCard
      v-for="course in cards"
      :key="course.id_course"
      :course="course"
      :subscribed="course.subscribed"
      :parent="'search'"
      @error="statusHandler"
    />
  </div>
</template>

<script>
import CourseCard from '@/components/Course/CourseCard.vue'
import { subscribeService as ss } from '@/servises/subscribe.service'
import BaseSearchBar from '@/components/Base/BaseSearchBar.vue'
import store from '@/store/index'

export default {
  name: 'search',
  data: function () {
    return {
      cards: [],
      error: 200
    }
  },
  components: {
    CourseCard,
    BaseSearchBar
  },
  mounted () {
    this.searchCourses()
  },
  methods: {
    searchCourses (inputSearch) {
      let filter
      if (inputSearch) filter = `?name=["${inputSearch}"]`

      // Get global courses
      store.dispatch('course/fetchCourses', filter)
        .then((courses) => {
          // Refresh data model
          this.cards = courses
          this.cards.forEach(card => {
            const date = new Date(card.creation_date)
            card.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
          this.fetchInscriptions(`?email=["${store.state.login.email}"]`)
        })
        .catch(() => {})
    },
    statusHandler (status) {
      this.error = status
    },
    fetchInscriptions (filter) {
      ss.getSubscriptionByFilter(filter)
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
          return store.dispatch('course/fetchCourses', `?id_course=[${ids}]`)
        })
        .then((courses) => {
          courses.forEach(course => {
            const i = this.cards.findIndex(card => card.id_course === course.id_course)
            this.cards[i].subscribed = true
          })
        })
        .catch(() => {})
    }
  },
  computed: {}
}
</script>
