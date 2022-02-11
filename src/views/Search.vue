<template v-on>
  <div class="bg-gray-200 p-3">
    <div class="container flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <input
          type="text"
          v-model="searchName"
          @input="searchCourses"
          class="h-14 w-96 pr-8 pl-5 rounded-lg z-0 focus:shadow focus:outline-none"
          placeholder="Search anything..."
        >
        <div class="absolute top-4 right-3">
            <i class='bx bx-search icon'></i>
        </div>
      </div>
    </div>
  </div>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
    <SearchCard
      v-for="card in cards"
      :key="card"
      :progress="card.progress"
      :courseName="card.courseName"
      :courseDescription="card.courseDescription"
      :courseCover="card.courseCover"
      :creatorName="card.creatorName"
    ></SearchCard>
  </div>
</template>

<script>
import SearchCard from '../components/SearchCard.vue'
import { coursesService as cs } from '../servises/course.service'
// import store from '../store/index'

export default {
  name: 'search',
  data: function () {
    return {
      searchName: '',
      cards: []
      // progress: 20
    }
  },
  computed: {},
  mounted () {
    this.searchCourses()
  },
  methods: {
    searchCourses () {
      let filter
      if (this.searchName) {
        filter = `?name=[${this.searchName}]`
      }
      cs.getCoursesByFilter(filter)
        .then((response) => {
          // Save a refreshToken and accessToken
          if (response.status === 200) {
            return response.json()
          } else {
            // err
          }
        })
        .then((courses) => {
          // Refresh data model
          this.cards = []
          for (const course of courses) {
            this.cards.push({
              courseName: course.name,
              courseDescription: course.description,
              creatorName: course.email_creator,
              courseCover: `data:image/png;base64,${course.img_cover}`
            })
          }
        })
        .catch(() => {})
    }
  },
  components: {
    SearchCard
  }
}

</script>

<style scoped>
</style>
