<template>
    <!-- Main -->
    <div class="flex flex-col bg-white rounded-md w-full h-full lg:aspect-[9/16] overflow-y-auto shadow-md dark:bg-dark-sidebar notranslate">

      <!-- Title -->
      <span class="border-b-[1px] border-slate-400 p-2 text-2xl font-semibold text-center dark:text-light-text">
        Unità
      </span>

      <!-- Unit Container - View Mode -->
      <ul v-if="!edit" class="relative w-full overflow-y-auto px-2">
        <li class="flex align-center flex-col mb-1 mt-2"
          v-for="(unit, index) in units"
          :key="unit.id_unit"
        >
          <!-- Unit -->
          <div class="flex justify-center items-center rounded-lg font-medium cursor-pointer p-4 bg-green-700 text-white hover:bg-green-800 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500"
              @click="display[index] = !display[index]"
              :class="{'': display[index]}">
            <h4 class="select-none">{{unit.name}}</h4>
          </div>

          <!-- Lesson Container -->
          <div
            :class="{'hidden': display[index]}"
            class="py-4 px-2 m-2 mx-4 rounded-md border-[1px] border-slate-400 dark:border-gray-100"
          >

            <!-- Lesson -->
            <div class="flex flex-row justify-between items-center relative cursor-pointer rounded-md m-2 p-2 transition-colors select-none hover:bg-primary-light hover:decoration-black hover:decoration-2 dark:text-white dark:hover:bg-blue-500"
              v-for="(lesson) in unit.lesson"
              :key="lesson"
              @click="changeLesson(lesson.id_lesson)"
            >
              <p>{{lesson.name}}</p>

              <!-- Download Button -->
              <div class="aspect-square rounded-full hover:scale-125 transition">
                <i @click.stop="" class="fa-solid fa-circle-down text-[24px] text-green-700 dark:text-blue-300"></i>
              </div>

            </div>

          </div>
        </li>
      </ul>

      <!-- Unit Container - Edit Mode -->
      <ul v-else class="w-full overflow-y-auto px-2">
        <draggable
          v-model="localUnits"
          item-key="id_unit"
          tag="transition-group"
        >
          <template class="border border-black mt-3 cursor-move" #item="{element, index}">
            <li class="flex align-center flex-col mb-1 mt-2 gap-2">

              <!-- Unit Edit Input -->
              <template class="flex flex-row gap-2">
                <input class="appearance-none w-full px-4 rounded-md focus:outline-none dark:bg-dark-sidebar dark:text-light-text"
                  type="text"
                  :value="i === index ? updatedUnit : element.name"
                  @input="event => {updatedUnit = event.target.value}"
                  :disabled="i === index ? false : true"
                  maxlength="20"
                >
                <div class="flex flex-row justify-center items-center">

                  <!-- Edit -->
                  <svg v-if="i === index ? false : true" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512"
                    @click="i = index"
                  >
                    <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/>
                  </svg>

                  <!-- Update -->
                  <svg v-else class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512" fill="green"
                    @click="updateUnit(element.id_unit)"
                  >
                    <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/>
                  </svg>

                  <!-- Remove -->
                  <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512" fill="red"
                    @click="removeUnit(element.id_unit)"
                  >
                    <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM143 208.1L190.1 255.1L143 303C133.7 312.4 133.7 327.6 143 336.1C152.4 346.3 167.6 346.3 176.1 336.1L223.1 289.9L271 336.1C280.4 346.3 295.6 346.3 304.1 336.1C314.3 327.6 314.3 312.4 304.1 303L257.9 255.1L304.1 208.1C314.3 199.6 314.3 184.4 304.1 175C295.6 165.7 280.4 165.7 271 175L223.1 222.1L176.1 175C167.6 165.7 152.4 165.7 143 175C133.7 184.4 133.7 199.6 143 208.1V208.1z"/>
                  </svg>
                </div>
              </template>
            </li>
          </template>
        </draggable>

        <!-- Unit Add Input -->
        <li class="flex align-center flex-col mb-1 mt-2 gap-2">
          <template class="flex flex-row gap-2">
            <input class="appearance-none w-full px-4 rounded-md focus:outline-none dark:bg-dark-sidebar dark:text-light-text"
              v-model="newUnit"
              type="text"
              placeholder="Unit Name"
            >
            <div class="flex flex-col justify-center items-center">

              <!-- Add -->
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512" fill="green"
                @click="newUnit === '' ? '' : addUnit()"
                :class="newUnit === '' ? 'cursor-not-allowed' : 'cursor-pointer'"
              >
                <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/>
              </svg>
            </div>
          </template>
        </li>
      </ul>
    </div>
</template>

<script>
import store from '@/store/index'
import draggable from 'vuedraggable'
import { unitsService as us } from '@/servises/units.services'

export default {
  data: function () {
    return {
      currentLesson: 0,
      display: [],
      newUnit: '',
      updatedUnit: '',
      i: -1,
      localUnits: []
    }
  },
  components: {
    draggable
  },
  emits: ['lessonID', 'newUnit', 'deletedUnit', 'updatedUnit'],
  props: ['edit', 'units'],
  methods: {
    // Emit the lesson selected
    changeLesson (lessonID) { this.$emit('lessonID', lessonID) },

    // Create new unit (aggiungere controllo se vuoto)
    addUnit () {
      const obj = { id_course: this.courseID, name: this.newUnit, description: '' }
      us.createUnits(obj)
        .then((response) => {
          if (response.status === 200) {
            us.getUnitsByFilter(`name=["${obj.name}"]&id_course=[${obj.id_course}]`)
              .then((response) => {
                if (response.status === 200) return response.json()
              })
              .then((unit) => {
                this.$emit('newUnit', unit[0])
                this.newUnit = ''
              })
          } else if (response.status === 500) {
            const i = this.units.findIndex(unit => unit.name === obj.name)
            if (i !== -1) console.log('nome già in uso')
          }
        })
        .then(() => {
          this.localUnits = this.units
        })
    },

    // Remove unit by id
    removeUnit (id) {
      us.deleteUnitsByID(id, this.courseID)
        .then((response) => {
          if (response.status === 200) {
            this.$emit('deletedUnit', id)
          }
        })
        .then(() => {
          this.localUnits = this.units
        })
    },

    // Update unit data by id
    updateUnit (id) {
      const obj = { id_course: this.courseID, name: this.updatedUnit }
      us.updateUnitsByID(id, obj)
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((unit) => {
          if (unit !== undefined) {
            this.$emit('updatedUnit', unit)
            this.i = -1
          } else {
            const i = this.units.findIndex(unit => unit.name === obj.name)
            if (i !== -1) console.log('nome già in uso')
          }
        })
        .then(() => { this.localUnits = this.units })
    },

    // Update units order
    async updateUnitsOrder () {
      this.localUnits.forEach((unit, index) => {
        if (this.units[index].seqNumber !== unit.seqNumber) {
          const obj = { id_course: this.courseID, seqNumber: unit.seqNumber, name: unit.name }
          us.updateUnitsByID(unit.id_unit, obj)
            .then((response) => {
              if (response.status === 200) return response.json()
            })
            .then((unit) => {
              if (unit !== undefined) {
                this.$emit('updatedUnit', unit)
              }
            })
        }
      })
    }
  },
  computed: {
    courseID () { return store.state.course.id }
  },
  watch: {
    i (newValue, oldValue) {
      if (newValue !== -1) this.updatedUnit = this.localUnits[newValue].name
    },
    localUnits (newValue, oldValue) {
      this.i = -1
      this.localUnits.forEach((unit, index) => {
        unit.seqNumber = (index + 1)
        if (newValue[index].seqNumber !== oldValue[index].seqNumber) {
          this.updateUnitsOrder()
        }
      })
    }
  },
  mounted () {
    // create the display unit array
    for (const unit of this.units) {
      this.display.push(true)
      this.localUnits.push(unit)
    }
  }
}
</script>
