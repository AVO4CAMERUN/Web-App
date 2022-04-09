<template>
    <div class="flex flex-col bg-white rounded-md w-full h-full lg:aspect-[9/16] overflow-y-auto shadow-md dark:bg-dark-sidebar">
      <p class="border-b-[1px] border-slate-400 p-2 text-2xl font-semibold text-center dark:text-light-text">Unità</p>
      <ul class="w-full overflow-y-auto scrollbar px-2"> <!-- divide-y divide-slate-400 dark:divide-gray-100 -->
        <li class="flex align-center flex-col mb-1 mt-2"
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
          <div v-for="(lesson) in unit.unitLessons"
          class="cursor-pointer rounded-md m-2 p-2 text-center underline transition-colors select-none dark:text-light-text hover:bg-primary-light dark:hover:text-black hover:decoration-black hover:decoration-2"
          :key="lesson" @click="changeLesson(lesson.id_lesson)">{{lesson.name}}</div>
        </div>
        </li>
        <!-- gestitevi le apparizioni delle cose -->
        <li class="flex align-center flex-col mb-1 mt-2 rounded-md border">
          <form class="flex flex-row gap-2">
            <input class="appearance-none w-full px-4 rounded-md focus:outline-none dark:bg-dark-sidebar dark:text-light-text"
            type="text"
            placeholder="Unit Name"
            >
            <div class="flex flex-col justify-center items-center">
              <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512" fill="green">
                <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/>
              </svg>
              <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512" fill="red">
                <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM143 208.1L190.1 255.1L143 303C133.7 312.4 133.7 327.6 143 336.1C152.4 346.3 167.6 346.3 176.1 336.1L223.1 289.9L271 336.1C280.4 346.3 295.6 346.3 304.1 336.1C314.3 327.6 314.3 312.4 304.1 303L257.9 255.1L304.1 208.1C314.3 199.6 314.3 184.4 304.1 175C295.6 165.7 280.4 165.7 271 175L223.1 222.1L176.1 175C167.6 165.7 152.4 165.7 143 175C133.7 184.4 133.7 199.6 143 208.1V208.1z"/>
              </svg>
            </div>
          </form>
        </li>
        <li class="flex align-center flex-col mb-1 mt-2">
          <button type="button" class="text-white w-full bg-green-600 rounded-md text-sm py-4 px-5 text-center inline-flex items-center">
            <svg class="mr-2 -ml-2" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512" fill="white">
              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
            </svg>
            Add a Unit
          </button>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      currentLesson: 0,
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
