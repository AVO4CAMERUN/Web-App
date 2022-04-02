<template>
  <div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <ClassCard
      v-for="(userClass) in classes" :key="userClass"
      :classId="userClass.id"
      :name="userClass.name"
      :classImg="userClass.img_cover"
      @click="setCurrentClass(userClass.id)"
    />
  </div>
</template>

<script>
// import InscriptionsCard from '../components/Course/InscriptionsCard.vue'
/* import { subscribeService as ss } from '../servises/subscribe.service'
import { coursesService as cs } from '../servises/course.services' */
import store from '@/store/index'
import ClassCard from '@/components/Classes/ClassCard.vue'
// import { classesService as cls } from '@/servises/classes.services'

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
    setCurrentClass (id) {
      store.dispatch('classes/setCurrentClass', `id=[${id}]`)
    },
    fetchClasses () {
      store.dispatch('classes/fetchClasses', '')
        .then((response) => {
          this.classes = response
        })
      // store.dispatch('classes/setCurrentClass')
    }
  }
}
</script>
