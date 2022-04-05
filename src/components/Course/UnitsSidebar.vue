<template>
    <div class="flex flex-col bg-white rounded-md w-full h-full lg:aspect-[9/16] overflow-y-auto shadow-md dark:bg-dark-sidebar">
      <p class="border-b-[1px] border-slate-400 p-2 text-2xl font-semibold text-center dark:text-light-text">Unità</p>
      <ul class="w-full overflow-y-auto scrollbar px-2 divide-y divide-slate-400 dark:divide-gray-100">
        <li class="flex align-center flex-col mb-2"
          v-for="(unit, index) in units"
          :key="unit"
          :unitID="unit.id_unit"
          :courseID="unit.id_course"
          :unitName="unit.name"
          :unitPosition="unit.units_order"
          :unitDescription="unit.description"
          :unitLessons="unit.lesson"
        >
        <h4
          @click="display[index] = !display[index]"
          :class="{'': display[index]}"
          class="cursor-pointer px-5 pb-3 pt-5 text-black text-center inline-block hover:font-semibold rounded-t-lg select-none dark:text-light-text"
        >
          {{unit.unitName}}
        </h4>
        <div
          :class="{'hidden': display[index]}"
          class="py-4 px-2 rounded-md border-[1px] border-slate-400 dark:border-gray-100"
        >
          <div v-for="lesson in unit.unitLessons"
          class="cursor-pointer rounded-md m-2 p-2 text-center underline transition-colors select-none dark:text-light-text hover:bg-primary-light dark:hover:text-black hover:decoration-black hover:decoration-2"
          :key="lesson" @click="changeLesson(lesson.id_lesson)">{{lesson.name}}</div>
        </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      display: []
    }
  },
  props: {
    units: Array,
    ulength: Number
  },
  methods: {
    changeLesson (lessonID) { this.$emit('lessonID', lessonID) },
    changeUnit () {}
  },
  watch: {},
  mounted () {
    for (let i = 0; i < this.ulength; i++) {
      this.display.push(true)
    }
  }
}
</script>

<style>
</style>
