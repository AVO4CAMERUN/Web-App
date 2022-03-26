<template v-on>
  <div class="p-3">
    <div class="flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <input
          type="text"
          v-model="searchName"
          @input="searchCourses"
          class="h-14 w-96 pr-8 pl-5 rounded-lg z-0 focus:shadow focus:outline-none"
          placeholder="Search anything..."
        >
        <i class='absolute top-1/2 -translate-y-[45%] right-3 bx bx-search icon'></i>
      </div>
    </div>
  </div>
  <div v-if="error == 500" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Hai già aggiunto questo corso</p>
    <p class="text-sm">Vai nella sezione I Miei Corsi per iniziare a seguirlo.</p>
  </div>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
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
import store from '@/store/index'

export default {
  name: 'search',
  data: function () {
    return {
      searchName: '',
      cards: [],
      error: 200
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
      if (this.searchName) filter = `?name=[${this.searchName}]`

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
