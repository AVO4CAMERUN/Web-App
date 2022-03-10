<template>
  <div class="p-3 bg-white rounded-md relative col-span-full">
    <template v-if="quiz !== null">
      <p class="px-3 border-b-2 border-[#e5e7eb] bg-white select-none text-3xl font-semibold mb-5">Quiz: {{quiz.title}}</p>
      <div v-for="question in quiz.quiz" :key="question">
        <p class="text-lg font-bold border-slate-300">{{question.question}}</p> <!-- border-b-2 -->

        <p v-if="question.type == 'multiple'" class="text-sm text-gray-500">(Risposta multipla)</p>
        <p v-else class="text-sm text-gray-500">(Risposta singola)</p>

        <div v-for="answer in question.answers" :key="answer">
          <input :type="typeInput(question.type)" class="accent-input" :name="question.question"/>
          <label>{{` ${answer}`}}</label>
        </div>
      </div>
      <button
        type="submit"
        class="bg-input py-2 px-3 text-white text-sm font-semibold rounded-md hover:bg-[#0E6655] bg-[#16A085]"
      >Submit</button>
    </template>
  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  props: {
    quiz: Object
  },
  mounted () {
  },
  methods: {
    raccoltaRisposte () {},
    typeInput (type) {
      if (type === 'multiple') return 'checkbox'
      else if (type === 'single') return 'radio'
    }
  },
  watch: {},
  components: {}
}
</script>

<style>
</style>
