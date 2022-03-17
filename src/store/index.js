import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'
import * as login from '@/store/module/login.module'
import * as classes from '@/store/module/classes.module'
import * as course from '@/store/module/course.module'

/*
******* Introduzione *******
Oggetto inizializzatore del plug-in per rendere persistente lo stato del app.
Il funzionamento è molto semplice, utilizza la reattivita nativa del vuex,
Cosi i cambiamenti in un 'posto' persistente come: localStorage, sessionStorage, localforage
(che dovrebbe utilizzare indexedDB un DB integrato con il browser),
ci sarebbere altre soluzioni come WEB SQL ma è deprecato poiche sostituito con indexedDB ✨✨✨

******* Soluzione adotatta *******
In avo4cum si utilizza il localStorage poiche puo matenere i dati anche dopo la chiusura della scheda del browser
ed poiche non è necessaria la potenza di indexedDB 🛢️🛢️
(anche se in futuro con il crescere dei corsi e degli utenti potrebbe esere necessario)

******* Riferimenti *******
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
https://www.npmjs.com/package/vuex-persist
*/

const vuexLocalStorage = new VuexPersist({
  key: 'avo4cam',
  storage: window.localStorage,
  // restoreState: (key, storage) => JSON.parse(JSON.stringify(storage.getItem(key))),
  modules: ['login', 'classes', 'course']
})

export default createStore({
  modules: { ...login, ...classes, ...course },
  plugins: [vuexLocalStorage.plugin]
})

/*
state: {},
mutations: {},
actions: {},
*/
