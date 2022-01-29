<template>
<div class="m-8 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
  <SearchCard v-for="card in cards" :progress="card.progress" :key="card"></SearchCard>
</div>
</template>

<script>
// import store from '../store/index'
import SearchCard from '../components/SearchCard.vue'

export default {
  name: 'login',
  data: function () {
    return {
      cards: [
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 20 },
        { progress: 10 },
        { progress: 30 },
        { progress: 5 }
      ]
    }
  },
  computed: {},
  methods: {},
  components: {
    SearchCard
  }
}

</script>
