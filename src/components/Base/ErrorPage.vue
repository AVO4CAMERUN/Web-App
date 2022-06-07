<template>
  <section class="w-full h-full bg-gray-100 rounded-md grid content-center justify-center gap-5">
    <p class="text-center text-9xl" :class="color(error)">{{error != 'video' ? error: ''}}</p>
    <p class="text-center text-lg">{{text}}</p>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: ['text', 'error'],
  data: function () {
    return {}
  },
  methods: {
    color (s) {
      switch (s) {
        case '404':
        case '403':
          return 'text-rose-500'
        case '500':
          return 'text-orange-400'
        case 'video':
          return 'bx bx-error text-amber-500'
      }
    }
  }
}
</script>
