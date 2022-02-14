<template v-on>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
    <MyCourseCard
      v-for="card in cards"
      :key="card"
      :courseID="card.courseID"
      :courseName="card.courseName"
      :courseDescription="card.courseDescription"
      :courseCover="card.courseCover"
      :creatorName="card.creatorName"
      :creationDate="card.creationDate"
    ></MyCourseCard>
  </div>
</template>
<script>
import MyCourseCard from '../components/cards/MyCourseCard.vue'
import { subscribeService as ss } from '../servises/subscribe.service'
import { coursesService as cs } from '../servises/course.service'

export default {
  name: 'mycourses',
  data: function () {
    return {
      cards: []
    }
  },
  components: {
    MyCourseCard
  },
  mounted () {
    this.fetchMyCourses(`?email=[${localStorage.getItem('email')}]`)
  },
  methods: {
    fetchMyCourses (filter) {
      ss.getSubscriptionByFilter(filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else { }
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
        })
        .catch(() => {})
    }
  }
}
</script>
