<template>
    <div class="flex flex-col bg-white rounded-md w-full h-full aspect-[9/16] overflow-y-auto" >
      <p class="border-b-[1px] border-slate-400 p-2 text-2xl font-semibold text-center">Corso</p>
      <ul class="w-full px-3 pt-2 overflow-y-auto scrollbar" x-data="{selected:null}" >
        <li class="pb-4 flex align-center flex-col"
          v-for="unit in units"
          :key="unit"
          :unitID="unit.id_unit"
          :courseID="unit.id_course"
          :unitName="unit.name"
          :unitDescription="unit.description"
          :unitLessons="unit.lesson"
        >
        <h4
          @click="selected !== 0 ? (selected = 0) : (selected = null)"
          class="text-black cursor-pointer px-5 py-3 bg-slate-400 text-white text-center inline-block hover:opacity-75 rounded-md "
        >
          {{unit.unitName}}
        </h4>
        <div v-class="" class="border py-4 px-2">
          <div v-for="lesson in unit.unitLessons"
          class="cursor-pointer rounded-md bg-emerald-400 m-2 p-2 select-none hover:opacity-75"
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
      selected: 0,
      positions: []
    }
  },
  mounted () {
    this.units.forEach(() => {
      this.positions.push(false)
    })
  },
  methods: {
    changeLesson (lessonID) {
      this.$emit('lessonID', lessonID)
    },
    changeUnit () {
    }
  },
  props: {
    units: Array
  }
}
</script>

<style>
</style>
