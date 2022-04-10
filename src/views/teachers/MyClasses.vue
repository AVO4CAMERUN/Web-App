<template>
  <div class="m-8 grid gap-4 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <ClassCard
      v-for="(userClass) in classes" :key="userClass"
      :classId="userClass.id"
      :name="userClass.name"
      :classImg="userClass.img_cover"
      :creationDate="userClass.creation_date"
      @click="setCurrentClass(userClass.id)"
    />
  </div>
</template>

<script>
import store from '@/store/index'
import router from '@/router/index'
import ClassCard from '@/components/Classes/ClassCard.vue'

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
        .then(() => {
          router.push({ name: 'class' })
        })
    },
    fetchClasses () {
      store.dispatch('classes/fetchClasses', '')
        .then((response) => {
          this.classes = response
          this.classes.forEach(c => {
            const date = new Date(c.creation_date)
            c.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
        })
    }
  }
}
</script>
