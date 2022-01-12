//https://vuejs.org/ 
//https://vuex.vuejs.org/guide/

import store from './store/index.js'

//Root app 
const app = new Vue({
    el: '#app',     //
    store: store,   //
    data: {},       //
    
    //
    component:[],

    //
    created: function () {},

    //
    template:`<div></div>`,

});

