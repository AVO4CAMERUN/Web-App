<template v-on>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
    <MyCourseCard
      v-for="card in cards"
      :key="card"
    ></MyCourseCard>
  </div>
</template>
<script>
import MyCourseCard from '../components/cards/MyCourseCard.vue'
import { subscribeService as ss } from '../servises/subscribe.service'

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
    this.fetchMyCourses(`?email=[${1}]`)
  },
  methods: {
    fetchMyCourses () {
      ss.getSubscriptionByFilter()
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else { }
        })
        .then((courses) => {
          console.log(courses)
        })
        .catch(() => {})
    }
  }
}
</script>
