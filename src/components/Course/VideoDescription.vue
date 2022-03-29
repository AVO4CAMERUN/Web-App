<template>
  <div
    v-if="lessonID !== null"
    class="p-3 bg-white rounded-md relative col-span-full shadow-lg dark:bg-dark-sidebar"
  >
    <p class="px-3 border-b-2 border-[#e5e7eb] select-none text-3xl font-semibold dark:text-light-text dark:border-slate-500" id="btn-desc">DESCRIZIONE</p>
    <div class="text-[14px] p-3 overflow-y-auto scrollbar h-full text-justify break-words dark:text-light-text" id="desc">
      <p> {{lessonID}}</p>
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
  components: {
  },
  props: {
    lessonID: Number,
    lessonName: String
  }
}
</script>

<style>
</style>
