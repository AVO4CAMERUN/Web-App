<template>
  <div class="p-3 bg-white rounded-md relative col-span-full">
    <p class="px-3 border-b-2 border-[#e5e7eb] bg-white select-none text-3xl font-semibold" id="btn-desc">DESCRIZIONE</p>
    <div class="text-[14px] p-3 overflow-y-auto scrollbar h-full text-justify break-words" id="desc">
      <p> {{lessonID}}</p>
      <p> {{lessonName}}</p>
      <p> {{lessonQuiz}}</p>
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
