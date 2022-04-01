<template v-on>
  <BaseSearchBar @inputSearch="searchCourses"/>
  <div v-if="error == 400" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Hai già aggiunto questo corso</p>
    <p class="text-sm">Vai nella sezione I Miei Corsi per iniziare a seguirlo.</p>
  </div>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <SearchCard
      v-for="card in cards"
      :key="card"
      :courseID="card.courseID"
      :courseName="card.courseName"
      :courseDescription="card.courseDescription"
      :courseCover="card.courseCover"
      :creatorName="card.creatorName"
      :creationDate="card.creationDate"
      @error="statusHandler"
    />
  </div>
</template>

<script>
import SearchCard from '@/components/Search/SearchCard.vue'
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
    SearchCard,
    BaseSearchBar
  },
  mounted () {
    this.searchCourses()
  },
  methods: {
    searchCourses (inputSearch) {
      let filter
      if (inputSearch) filter = `?name=[${inputSearch}]`

      // Get global courses
      store.dispatch('course/fetchCourses', filter)
        .then((courses) => {
          // Refresh data model
          this.cards = []
          for (const course of courses) {
            const date = new Date(course.creation_date)

            this.cards.push({
              courseID: course.id_course,
              courseName: course.name,
              courseDescription: course.description,
              creatorName: course.email_creator,
              courseCover: course.img_cover,
              creationDate: `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
            })
          }
        })
        .catch(() => {})
    },
    statusHandler (status) {
      this.error = status
    }
  },
  computed: {}
}
</script>
