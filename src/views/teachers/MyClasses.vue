<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-6 sm:mb-0 mt-10 overflow-y-auto">
    <ClassCard
      v-for="userClass in classes" :key="userClass"
      :name="userClass.name"
      :imgClass="userClass.img_cover"
    />
  </div>
</template>

<script>
// import MyCourseCard from '../components/Course/MyCourseCard.vue'
/* import { subscribeService as ss } from '../servises/subscribe.service'
import { coursesService as cs } from '../servises/course.services'
import store from '@/store/index' */
import ClassCard from '@/components/Classes/ClassCard.vue'
import { classesService as cls } from '@/servises/classes.services'

export default {
  name: 'myclasses',
  data: function () {
    return {
      classes: []
    }
  },
  components: {
    ClassCard
  },
  mounted () {
    this.fetchClasses()
  },
  methods: {
    fetchClasses () {
      cls.getClassesByFilter('')
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((response) => {
          console.log(response)
          this.classes = response
        })
    }
  }
}
</script>
