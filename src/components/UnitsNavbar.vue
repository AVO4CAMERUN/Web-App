<template>
  <div class="realtive w-full mr-10">
    <div class="flex flex-col bg-white h-full rounded-md w-full overflow-y-auto" >
      <p
        class="
          border-b-[1px] border-slate-400
          p-2
          text-2xl
          font-semibold
          text-center
        "
      >
        Corso
      </p>
      <ul class="block w-11/12 pt-2 mx-auto overflow-y-auto scrollbar" x-data="{selected:null}" >
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
          <div class="border py-4 px-2">
            <div v-for="lesson in unit.unitLessons" :key="lesson">{{lesson.name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { unitsService as us } from '../servises/units.service'
export default {
  data: function () {
    return {
      units: []
    }
  },
  mounted () {
    this.fetchUnits('?id_course=[1]')
  },
  methods: {
    fetchUnits (filter) {
      us.getUnitsByFilter(filter)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else { }
        })
        .then((unitList) => {
          console.log(unitList)
          this.cards = []
          unitList.forEach(unit => {
            this.units.push({
              unitID: unit.id_unit,
              courseID: unit.id_course,
              unitName: unit.name,
              unitDescription: unit.description,
              unitLessons: unit.lessons
            })
          })
        })
        .catch(() => {})
    }
  },
  props: {
    idCourse: Number
  }
}
</script>

<style>
</style>
