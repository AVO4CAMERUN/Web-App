<template>
  <!-- Header -->
  <div class="flex flex-row gap-2 m-8 mb-2 p-2">
    <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
    <p class="text-green-800 text-xl font-semibold grow-0">Your Classes</p>
    <hr class="rounded h-1 bg-green-700 border border-green-700 self-center grow">
  </div>

  <div v-if="empty || archived > 0" class="bg-yellow-100 border-t border-b border-l border-r border-yellow-500 text-yellow-700 px-4 py-3 mx-5 my-5">
    <p class="font-bold"> {{empty ? 'Not Found' : 'Archived Classes'}}</p>
    <p class="text-sm">{{empty ? 'You are not in any class. Go to Created Classes to create them' : 'There are some classes archived, look into Created Classes to restore them'}}</p>
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
