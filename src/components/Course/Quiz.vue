<template>
  <!-- Quiz -->
  <template v-if="quiz">
    <div class="p-4 col-span-full rounded-md shadow-lg bg-white dark:bg-dark-sidebar dark:text-light-text notranslate">

      <!-- Title -->
      <p class="p-2 border-b-2 border-[#e5e7eb] select-none text-3xl font-semibold">Quiz: {{quiz.title}}</p>
      <form @submit.prevent="submitAnswers(e)">
        <div v-for="(question, qindex) in quiz.quiz" :key="question">
          <!-- Question -->
          <p class="px-6 pt-2.5 pb-1 text-lg font-bold border-slate-300">{{question.question}}</p>

          <!-- Answer Type -->
          <p v-if="question.type == 'multiple'" class="px-6 pb-2 text-sm text-gray-500 dark:text-gray-300">(Multiple Choice)</p>
          <p v-else class="px-6 pb-2 text-sm text-gray-500 dark:text-gray-300">(Single Choice)</p>
          <div v-for="(answer, aindex) in question.answers" :key="answer">
            <!-- Answer -->
            <label class="mx-2" :class="submit ? !correct(aindex, qindex) && quizAnswers[qindex] === aindex ? 'text-red-500 line-through' : !correct(aindex, qindex) ? '' : 'text-green-700 underline' : ''">
              <!-- :checked="aindex == 0" v-model="quizAnswers[qindex]" -->
              <input
                :type="typeInput(question.type)"
                :value="aindex"
                :name="question.question"
                class="accent-input ml-12 m-2"
                v-model="quizAnswers[qindex]"
                required
                :disabled="submit"
              />

              {{answer}}
            </label>
            <i v-if="correct(aindex, qindex) && submit" class="fa-solid fa-check text-[20px] text-green-700"></i>
            <i v-else-if="!correct(aindex, qindex) && quizAnswers[qindex] === aindex && submit" class="fa-solid fa-x text-[16px] text-red-500"></i>
          </div>
        </div>

        <!-- Submit -->
        <div class="p-4 flex flex-row justify-start items-center">
          <button
            type="submit"
            class="py-3 px-6 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200"
          >Submit</button>
        </div>
      </form>
    </div>
  </template>

  <!-- Quiz Creation -->
  <template v-else-if="edit"> {{createdQuiz}}
    <!-- Creazione Quiz -->
    <div class="p-4 col-span-full rounded-md shadow-lg bg-white dark:bg-dark-sidebar da">
      <!-- Title -->
      <input
        class="w-full p-2 border-b-2 border-[#e5e7eb] select-none text-3xl font-semibold bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white"
        placeholder="Quiz Title"
        v-model="createdQuiz.title"
      >

      <!-- Add Question -->
      <div class="pt-3 flex flex-row justify-start items-center">
        <button
          class="py-1.5 px-3 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200"
          @click="addQuestion"
        >
          Add Question
        </button>
      </div>

      <!-- Single Quiz -->
      <div
        class="w-full flex flex-col mt-4 pb-2 p-2 rounded-lg border border-gray-400"
        v-for="(newQuiz, qindex) in createdQuiz.quiz"
        :key="newQuiz"
      >
        <div class="flex flex-col gap-4 m-2">

          <!-- Question, Answer Type -->
          <div class="flex flex-row justify-between">
            <!-- Question -->
            <input
              class="w-[50%] p-2 border-b-2 border-[#e5e7eb] bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white"
              type="text"
              placeholder="Question"
              v-model="newQuiz.question"
            >

            <!-- Answer Type -->
            <div class="flex flex-row justify-end items-center gap-2">
              <p class="dark:text-white">Answer Type:</p>
              <select
                class="bg-transparent text-gray-700 border border-gray-300 p-2 rounded-lg leading-tight focus:outline-none dark:text-white"
                v-model="newQuiz.type"
                @change="resetCorrectAnswers(qindex)"
              >
                <option class="dark:text-black" value="single" >Single</option>
                <option class="dark:text-black" value="multiple">Multiple</option>
              </select>
            </div>

          </div>

          <!-- Add Answer -->
          <div class="flex flex-row justify-start items-center">
            <button
              class="py-1.5 px-3 text-white text-sm font-semibold rounded-md hover:bg-emerald-500 bg-emerald-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-500 duration-200"
              @click="addAnswer(qindex)"
            >
              Add Answer
            </button>
          </div>

          <!-- Answers -->
          <div class="flex flex-col gap-4 pl-4 py-2">
            <div
              class="flex flex-row justify-between"
              v-for="(answer, aindex) in newQuiz.answers"
              :key="aindex"
            >
              <input
                :type="newQuiz.type === 'single' ? 'radio' : 'checkbox'"
                :name="qindex" class="self-center mr-4"
                @change="addCorrectAnswer(qindex, aindex)"
              >
              <input
                type="text"
                placeholder="Answer"
                class="w-full p-2 border-b-2 border-[#e5e7eb] bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white"
                v-model="newQuiz.answers[aindex]"
              >
              <i class="ml-2 bx bxs-minus-circle text-rose-600 cursor-pointer text-[32px]" />
            </div>
          </div>

          <!-- Correct Answer/Answers
          <select class="bg-transparent text-gray-700 border border-gray-300 p-2 rounded-lg leading-tight focus:outline-none dark:text-white">
            <option class="dark:text-black">Correct Answer/Answers</option>
          </select> -->
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
      quizAnswers: [],
      createdQuiz: {
        title: '',
        quiz: [{ type: 'single', answers: [''], correct_answers: [] }]
      },
      submit: false
    }
  },
  props: ['quiz', 'edit'],
  mounted () {
    if (this.quiz) this.quiz.quiz.forEach(() => this.quizAnswers.push(null))
  },
  methods: {
    correct (aindex, qindex) {
      let correct = false
      const correctAnswers = this.quiz.quiz[qindex].correct_answers
      // console.log(aindex)
      correctAnswers.forEach((element) => {
        if (aindex === element) {
          correct = true
        }
      })
      return correct
    },
    submitAnswers (e) {
      let compiled = true
      this.quizAnswers.forEach(e => {
        if (e === null) compiled = false
      })
      console.log(compiled)
      if (compiled) this.submit = true
    },
    typeInput (type) {
      if (type === 'multiple') return 'checkbox'
      else if (type === 'single') return 'radio'
    },

    // Quiz Creation
    addQuestion () {
      // may add max questions
      this.createdQuiz.quiz.push({ type: 'single', answers: [''], correct_answers: [] })
    },
    addAnswer (qindex) {
      // may add max answers
      this.createdQuiz.quiz[qindex].answers.push('')
    },
    addCorrectAnswer (qindex, aindex) {
      let correctAnswers = this.createdQuiz.quiz[qindex].correct_answers
      console.log(qindex)
      const i = correctAnswers.findIndex(e => e === aindex)
      if (this.createdQuiz.quiz[qindex].type === 'single') correctAnswers = [aindex]
      else if (i === -1) correctAnswers.push(aindex)
      else correctAnswers.splice(i, 1)
    },
    resetCorrectAnswers (qindex) {
      this.createdQuiz.quiz[qindex].correct_answers = []
    }
  }
}
</script>

<style>
</style>
