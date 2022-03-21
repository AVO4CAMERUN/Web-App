<template>
   <div class="flex flex-col items-center space-y-4 pb-4 bg-white rounded-lg shadow-xl">
    <img
      v-if="classImg !== ''"
      :src="`data:image/png;base64,${classImg}`"
      class="w-full h-40 object-cover object-center rounded-lg"
      alt="img"
    />
    <img v-else class="block w-full h-40 object-cover object-center" src="https://picsum.photos/400/300">

    <h4 class="text-black text-2xl font-bold capitalize text-center">{{name}}</h4>
    <p class="text-black/50">Members{{}}</p>

    <!-- <p class="absolute top-2 text-black inline-flex items-center text-xs">
      0 Online {{}}
      <span class="ml-2 w-2 h-2 block bg-red-400 rounded-full group-hover:animate-pulse"></span>
    </p> -->

    <div
        class="w-30 px-4 py-2 text-white font-bold text-sm text-center bg-emerald-500 rounded hover:bg-emerald-600">
      <router-link
        :to="{name: 'class'}"
      >
      Go to class
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassCard',
  data: function () {
    return {}
  },
  props: {
    classId: Number,
    name: String,
    classImg: String
  },
  methods: {},
  components: {},
  mounted () {}
}
</script>

<style>

</style>
