<template>
  <template v-if="quiz === null">
    <div class="p-4 col-span-full rounded-md shadow-lg bg-white dark:bg-dark-sidebar dark:text-light-text">

      <!-- Title -->
      <p class="p-2 border-b-2 border-[#e5e7eb] select-none text-3xl font-semibold">Quiz: {{quiz.title}}</p>

      <div v-for="question in quiz.quiz" :key="question">
        <!-- Question -->
        <p class="px-6 pt-2.5 pb-1 text-lg font-bold border-slate-300">{{question.question}}</p>

        <!-- Answer Type -->
        <p v-if="question.type == 'multiple'" class="px-6 pb-2 text-sm text-gray-500 dark:text-gray-300">(Risposta multipla)</p>
        <p v-else class="px-6 pb-2 text-sm text-gray-500 dark:text-gray-300">(Risposta singola)</p>
        <div v-for="(answer, aindex) in question.answers" :key="answer">
           <!-- :checked="aindex == 0" v-model="quizAnswers[qindex]" -->
          <input
            :type="typeInput(question.type)"
            :value="aindex"
            :name="question.question"
            class="accent-input ml-12 m-2"
          />

          <!-- Answer -->
          <label class="ml-2">{{answer}}</label>
        </div>
      </div>

      <!-- Submit -->
      <div class="p-4 flex flex-row justify-start items-center">
        <button
          type="submit"
          class="py-3 px-6 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200"
          @click="checkQuiz"
        >Submit</button>
      </div>
    </div>
  </template>
  <template v-else>
    <!-- Creazione Quiz -->
    <div class="p-4 col-span-full rounded-md shadow-lg bg-white dark:bg-dark-sidebar da">
      <!-- Title -->
      <input class="w-full p-2 border-b-2 border-[#e5e7eb] select-none text-3xl font-semibold bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white" placeholder="Quiz Title">

      <!-- Add Question -->
      <div class="pt-3 flex flex-row justify-start items-center">
        <button class="py-1.5 px-3 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200">
          Add Question
        </button>
      </div>

      <div class="w-full flex flex-col mt-4 pb-2 p-2 rounded-lg border border-gray-400">
        <div class="flex flex-col gap-4 m-2">

          <!-- Question, Answer Type -->
          <div class="flex flex-row justify-between">
            <!-- Question -->
            <input type="text" placeholder="Question" class="w-[50%] p-2 border-b-2 border-[#e5e7eb] bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white">

            <!-- Answer Type -->

            <!-- Primo Tipo -->
            <!-- <div class="flex flex-row gap-2 justify-center items-center">
              <button class="py-1.5 px-2 rounded-md justify-center items-center cursor-pointer text-white bg-emerald-600 hover:bg-emerald-500 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200">
                <i class="fa-solid fa-circle-dot text-[20px]"></i> Radio
              </button>
              <button class="py-1.5 px-2 rounded-md justify-center items-center cursor-pointer text-white bg-emerald-600 hover:bg-emerald-500 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200">
                <i class="fa-solid fa-square-check text-[20px]"></i> CheckBox
              </button>
            </div> -->

            <!-- Secondo Tipo -->
            <div class="flex flex-row justify-end items-center gap-2">
              <p class="dark:text-white">Answer Type:</p>
              <select class="bg-transparent text-gray-700 border border-gray-300 p-2 rounded-lg leading-tight focus:outline-none dark:text-white">
                <option class="dark:text-black">Single</option>
                <option class="dark:text-black">Multiple</option>
              </select>
            </div>

          </div>

          <!-- Add Answer -->
          <div class="flex flex-row justify-start items-center">
            <button
              type="submit"
              class="py-1.5 px-3 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200"
            >Add Answer</button>
          </div>

          <!-- Answers -->
          <div class="flex flex-col gap-4 pl-4 py-2">
            <!-- Div da moltiplicare per le risposte -->
            <div class="flex flex-row justify-between">
              <input type="text" placeholder="Answer" class="w-full p-2 border-b-2 border-[#e5e7eb] bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white">
              <i class="ml-2 bx bxs-minus-circle text-rose-600 cursor-pointer text-[32px]"></i>
            </div>
          </div>

          <!-- Correct Answer/Answers -->
          <select class="bg-transparent text-gray-700 border border-gray-300 p-2 rounded-lg leading-tight focus:outline-none dark:text-white">
            <option class="dark:text-black">Correct Answer/Answers</option>
          </select>
        </div>
      </div>

      <!-- Create Quiz -->
      <div class="p-4 flex flex-row justify-start items-center">
        <button class="py-3 px-6 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200">
          Create Quiz
        </button>
      </div>
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
