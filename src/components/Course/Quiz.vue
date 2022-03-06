<template>
  <div class="p-3 bg-white rounded-md relative col-span-full">
    <div class="m-auto mt-2 p-4 rounded-md shadow-lg border-[1px] border-slate-100 w-1/2">
      <h2 class="text-3xl font-bold"></h2>

      <div>
        <!-- Prima domanda -->
        <p class="text-lg font-bold border-b-2 border-slate-300">{{quiz.title}}</p>
        <p class="text-sm text-gray-500">(Risposta multipla)</p>

        <div class="">
          <input type="checkbox" name="A" class="accent-input" id="A" />
          <label for="A">Risposta A</label>
        </div>

        <div class="">
          <input type="checkbox" name="B" class="accent-input" id="B" />
          <label for="B">Risposta B</label>
        </div>

        <div class="">
          <input type="checkbox" name="C" class="accent-input" id="C" />
          <label for="C">Risposta C</label>
        </div>

        <div class="">
          <input type="checkbox" name="D" class="accent-input" id="D" />
          <label for="D">Risposta D</label>
        </div>
      </div>

      <div class="">
        <!-- Seconda domanda -->
        <p class="text-lg font-bold border-b-2 border-slate-300">
          Seconda domanda a caso (!)
        </p>
        <p class="text-sm text-gray-500">(Una risposta corretta)</p>
        <div class="">
          <input type="radio" name="q" class="accent-input" value="E" />
          <label for="E">Risposta E</label>
        </div>

        <div class="">
          <input type="radio" name="q" class="accent-input" value="F" />
          <label for="F">Risposta F</label>
        </div>

        <div class="">
          <input type="radio" name="q" class="accent-input" value="G" />
          <label for="G">Risposta G</label>
        </div>

        <div class="">
          <input type="radio" name="q" class="accent-input" value="H" />
          <label for="H">Risposta H</label>
        </div>
      </div>
      <button
        type="submit"
        class="bg-input py-2 px-3 text-white text-sm font-semibold rounded-md hover:bg-[#0E6655] bg-[#16A085]"
      >Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  props: {
    lessonID: Number,
    quiz: Object
  },
  mounted () {
  },
  methods: {},
  computed: {
    quizListener: function () {
      return this.quiz
    },
    title: function () {
      return this.quiz.title
    },
    quizList: function () {
      return this.quiz.quiz
    }
  },
  components: {}
}
</script>

<style>
</style>
