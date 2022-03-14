<template>
   <div class="group shadow-xl bg-white py-10 sm:py-10 px-4 flex flex-col space-y-2 items-center rounded-md hover:bg-white/80 hover:smooth-hover ">
    <img
      v-if="imgClass !== ''"
      :src="`data:image/png;base64,${imgClass}`"
      class="w-20 h-20 object-cover object-center rounded-full"
      alt="img"
    />
    <img v-else class="block w-full h-full object-cover" src="https://picsum.photos/400/300">

    <h4 class="text-black text-2xl font-bold capitalize text-center">{{name}}</h4>
    <p class="text-black/50">Number members{{}}</p>

    <!-- <p class="absolute top-2 text-black inline-flex items-center text-xs">
      0 Online {{}}
      <span class="ml-2 w-2 h-2 block bg-red-400 rounded-full group-hover:animate-pulse"></span>
    </p> -->

    <div class="h-20">
      <button
        type="button"
        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded text-sm px-5 py-2 text-center mt-12 mr-2 mb-12 text-base"
      >Go to class</button>
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
    id: Number,
    name: String,
    imgClass: String
  },
  methods: {},
  components: {},
  mounted () {}
}
</script>

<style>

</style>
