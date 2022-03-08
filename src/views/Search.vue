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
  <div class="ml-[100px] m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
    <SearchCard
      v-for="card in cards"
      :key="card"
      :courseID="card.courseID"
      :courseName="card.courseName"
      :courseDescription="card.courseDescription"
      :courseCover="card.courseCover"
      :creatorName="card.creatorName"
      :creationDate="card.creationDate"
    />
  </div>
</template>

<script>
import SearchCard from '../components/Search/SearchCard.vue'
import { coursesService as cs } from '../servises/course.services'
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
  components: {
    SearchCard
  },
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
    }
  },
  computed: {}
}
</script>
