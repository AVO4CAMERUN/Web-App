<template>
  <template v-if="quiz !== null">
    <div class="p-3 bg-white rounded-md relative col-span-full shadow-lg dark:bg-dark-sidebar dark:text-light-text">
      <p class="px-3 border-b-2 border-[#e5e7eb] select-none text-3xl font-semibold mb-5">Quiz: {{quiz.title}}</p>
      <div v-for="question in quiz.quiz" :key="question">
        <p class="text-lg font-bold border-slate-300">{{question.question}}</p> <!-- border-b-2 -->

        <p v-if="question.type == 'multiple'" class="text-sm text-gray-500 dark:text-gray-300">(Risposta multipla)</p>
        <p v-else class="text-sm text-gray-500 dark:text-gray-300">(Risposta singola)</p>
        <div v-for="(answer, aindex) in question.answers" :key="answer">
           <!-- :checked="aindex == 0" v-model="quizAnswers[qindex]" -->
          <input
            :type="typeInput(question.type)"
            :value="aindex"
            :name="question.question"
            class="accent-input"
          />
          <label>{{answer}}</label>
        </div>
      </div>
      <button
        type="submit"
        class="bg-input py-2 px-3 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600"
        @click="checkQuiz"
      >Submit</button>
    </div>
  </template>
</template>

<script>
export default {
  data: function () {
    return {
      quizAnswers: []
    }
  },
  props: {
    quiz: Object
  },
  mounted () {
    if (this.quiz) this.quiz.quiz.forEach(() => this.quizAnswers.push(0))
  },
  methods: {
    checkQuiz () {
      this.quizAnswers.forEach((element, index) => {
        if (this.quiz.quiz[index].correct_answers[0] !== element) {
          // azione se sbagli
        }
      })
      // azione tutto corretto
    },
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
