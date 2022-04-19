<template>
 <div v-if="empty || archived > 0" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold">Not Found</p>
    <p class="text-sm">{{empty ? 'You are not in any class. Ask your teacher to invite you' : 'There are some classes archived, look into my creation to restore them'}}</p>
  </div>
  <div class="m-8 grid gap-4 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
    <ClassCard
      v-show="!groupClass.archived"
      v-for="(groupClass, index) in classes"
      :key="groupClass.id"
      :groupClass="groupClass"
      :participants="participants[index]"
      :parent="'myclasses'"
    />
  </div>
</template>

<script>
import store from '@/store/index'
import ClassCard from '@/components/Classes/ClassCard.vue'

export default {
  name: 'myclasses',
  data: function () {
    return {
      classes: [],
      empty: false,
      archived: false
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
      store.dispatch('classes/fetchMyClasses', '')
        .then((response) => {
          this.classes = response
          if (this.classes === undefined || this.classes?.length === 0) {
            this.empty = true
            return
          }
          this.classes.forEach(c => {
            const date = new Date(c.creation_date)
            c.creation_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
            this.archived += c.archived
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
