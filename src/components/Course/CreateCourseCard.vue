<template>
  <div class="flex flex-wrap">
    <article class="h-[400px] w-[480px] bg-gray-100 overflow-hidden outline outline-[1px] outline-gray-200 rounded-lg shadow-xl dark:shadow-slate-900 dark:outline-gray-700 dark:bg-slate-900">
      <!-- contenitore dell'immagine -->
      <div class="h-[200px] group cursor-pointer relative">
        <!-- testo che appare on hover  -->
        <div class="h-full w-full opacity-0 absolute flex justify-center items-center group-hover:opacity-100 duration-300">
          <p class="font-semibold text-xl dark:text-white">cambia l'immagine del corso</p>
        </div>
        <!-- immagine del corso -->
        <img class="block w-full h-full object-cover group-hover:opacity-40 duration-200" src="https://picsum.photos/400/300" draggable="false">
      </div>

      <header class="flex items-center justify-between leading-tight p-4">
        <h1>
          <!-- inserimento nome del corso -->
          <input class="text-lg bg-gray-100 border-b-2 border-gray-300 lg:whitespace-nowrap font-semibold focus:outline-none dark:bg-slate-900 dark:text-white" placeholder="inserisci nome del corso">
        </h1>
        <!-- data di creazione del corso -->
        <div class="text-sm">{{todayDate}}</div>
      </header>

      <!-- descrizione del corso -->
      <textarea class="text-sm h-[9ex] resize-none w-[calc(100%_-_2rem)] break-words overflow-hidden m-2 mx-4 bg-gray-100 focus:outline-none dark:bg-slate-900 dark:text-white" placeholder="inserisci descrizione"></textarea>

      <footer class="flex items-center justify-between leading-none px-4">
        <div class="flex items-center">
          <p class="text-sm dark:text-white">{{creatorName}}</p>
        </div>
        <!-- toggolare 'cursor-not-allowed' / 'disabled' quando non sono stati inseriti tutti i parametri di registrazione del corso -->
        <input type="submit" value="crea corso" class="text-sm px-5 py-1.5 mr-2 mb-2 text-white bg-green-700 font-medium rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none">
      </footer>
    </article>
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  name: 'CreateCourseCard',
  data: function () {
    return {}
  },
  methods: {},
  computed: {
    creatorName () { return store.state.login.email },
    todayDate () { const date = new Date(); return date.toLocaleDateString() }
  }
}
</script>
