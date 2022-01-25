<template>
  <template v-for="card in cards">
    {{card.icon}}
  </template>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'mycourses',
  data: function () {
    return {
      isClose: true,
      cards: [
        { icon: 'bx bx-search icon', message: 'Search', path: '/search' },
        { icon: 'bx bx-book-bookmark icon', message: 'My Courses', path: '/mycourses' },
        { icon: 'bx bx-chalkboard icon', message: 'My Classes', path: '/myclasses' },
        { icon: 'bx bx-cog icon', message: 'Settings', path: '/settings' }
      ]
    }
  },
  components: {}
}
</script>
