<template>
  <div class="p-3 bg-white rounded-md relative col-span-full">
    <p class="px-3 border-b-2 border-[#e5e7eb] bg-white select-none text-3xl font-semibold" id="btn-desc">DESCRIZIONE</p>
    <div class="text-[14px] p-3 overflow-y-auto scrollbar max-h-[81vh] text-justify" id="desc">
     <p> {{lessonName}}</p>
    </div>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  mounted () {},
  methods: {},
  props: {
    lessonID: Number,
    lessonName: String,
    lessonQuiz: String
  }
}
</script>

<style>
</style>
