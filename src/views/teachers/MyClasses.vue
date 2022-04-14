<template>
 <div v-if="empty" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Not Found</p>
    <p class="text-sm">Inserire messaggio</p>
  </div>
  <div class="m-8 grid gap-4 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <ClassCard
      v-for="(userClass, index) in classes" :key="userClass"
      :classId="userClass.id"
      :groupClass="userClass"
      :participants="participants[index]"
      :parent="'myclasses'"
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
      classes: [],
      empty: false
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
          if (this.classes.length === 0) {
            this.empty = true
            return
          }
          this.classes.forEach(c => {
            const date = new Date(c.creation_date)
            c.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
          })
        })
    }
  },
  computed: {
    participants () {
      const part = []
      this.classes.forEach(e => {
        part.push(e.teachers.length + e.students.length)
      })
      return part
    }
  }
}
</script>
