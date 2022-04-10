<template>
  <div class="flex flex-wrap">
    <div class="border border-black w-[450px] bg-white overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:shadow-slate-700 dark:outline-gray-700 dark:bg-slate-900">
      <div class="h-[200px] relative border border-black">
        <img
          v-if="classImg !== ''"
          :src="`data:image/png;base64,${classImg}`"
          class="block w-full h-full object-cover"
          alt="img" draggable="false"
        />
        <img v-else class="block w-full h-full object-cover" src="https://picsum.photos/400/300" draggable="false">
      </div>

      <header class="h-[132px] flex flex-row justify-between p-8 gap-4 border border-black">
        <!-- Capire perché non fa il break alle parole -->
        <h4 class="break-normal text-black text-2xl font-bold capitalize dark:text-white border border-black">{{name}}</h4>
        <!-- <input type="text" class="text-black text-2xl font-bold capitalize border-b-2 border-gray-300 lg:whitespace-nowrap focus:outline-none dark:bg-slate-900 dark:text-white" placeholder="Negro di merda"> -->
        <div class="text-sm self-start pt-[4px] dark:text-white border border-black">
          {{creationDate}}
        </div>
      </header>

      <footer class="flex flex-row justify-center items-center gap-8 p-2 border border-black">
        <router-link
          class="text-sm px-5 py-2.5 text-white bg-green-700 font-medium rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none"
          :to="{name: 'class'}"
          draggable="false"
        >
        Go to class
        </router-link>
        <div class="flex gap-2">
          <i class="fa-solid fa-pen-to-square text-orange-900 text-[24px] dark:invert"></i>
          <i class="fa-solid fa-trash-can text-rose-600 text-[24px] dark:invert"></i>
        </div>
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
    creationDate: String,
    classImg: String
  },
  methods: {},
  components: {},
  mounted () {}
}
</script>

<style>

</style>
