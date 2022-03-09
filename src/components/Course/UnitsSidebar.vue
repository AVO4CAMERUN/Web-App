<template>
    <div class="flex flex-col bg-white rounded-md w-full h-full aspect-[9/16] overflow-y-auto" >
      <p class="border-b-[1px] border-slate-400 p-2 text-2xl font-semibold text-center">Corso</p>
      <ul class="w-full px-3 pt-2 overflow-y-auto scrollbar" x-data="{selected:null}" >
        <li class="mb-4 flex align-center flex-col"
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
          @click="positions[index] = 'block'"
          class="cursor-pointer px-5 py-3 bg-slate-700 text-white text-center inline-block hover:bg-slate-500 rounded-md select-none"
        >
          {{unit.unitName}}
        </h4>
        <div class="py-4 px-2 border border-[1px] border-slate-300 rounded-md" :class="positions[index]">
          <div v-for="lesson in unit.unitLessons"
          class="cursor-pointer rounded-md bg-emerald-400 m-2 p-2 select-none hover:bg-emerald-300 hover:underline hover:decoration-black hover:decoration-2"
          :key="lesson" @click="changeLesson(lesson.id)">{{lesson.name}}</div>
        </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      display: 'hidden',
      positions: this.units
    }
  },
  props: {
    units: Array
  },
  methods: {
    changeLesson (lessonID) { this.$emit('lessonID', lessonID) },
    changeUnit () {}
  },
  created () { }
}
</script>

<style>
</style>
