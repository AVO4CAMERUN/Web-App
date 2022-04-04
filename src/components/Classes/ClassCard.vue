<template>
  <div class="flex flex-wrap">
    <div class="h-[350px] w-[480px] bg-gray-100 overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg shadow-xl dark:shadow-slate-900 dark:outline-gray-700 dark:bg-slate-900">
      <div class="h-[200px] relative">
        <img
          v-if="classImg !== ''"
          :src="`data:image/png;base64,${classImg}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="https://picsum.photos/400/300" draggable="false">
      </div>

      <header class="flex flex-col items-center p-4">
        <h4 class="text-black text-2xl font-bold capitalize dark:text-white">{{name}}</h4>
        <p class="text-black inline-flex items-center text-xs dark:text-white">
           Mitch Scimmione {{}}
          <span class="ml-2 w-2 h-2 block bg-red-400 rounded-full animate-pulse"></span>
        </p>
      </header>

      <footer class="flex justify-center leading-none px-4">
        <router-link
          class="text-sm px-5 py-2.5 mr-2 mb-2 text-white bg-green-700 font-medium rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :to="{name: 'class'}"
          draggable="false"
        >
        Go to class
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
// classImg !== ''
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
