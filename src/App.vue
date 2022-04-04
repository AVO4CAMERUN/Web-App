<template>
  <div class="dark"> <!-- Da cambiare con 'dark' per usare la dark mode -->
    <template v-if="isLogged">
      <div class="flex">
        <Sidebar></Sidebar>
        <section class="grow bg-primary-bg dark:bg-dark-bg">
          <Header></Header>
            <div class="overflow-y-auto overflow-x-hidden scrollbar max-h-[calc(100vh_-_76px)]">
              <router-view/> <!-- main -->
            </div>
        </section>
      </div>
    </template>
    <router-view v-else/>
  </div>
</template>

<script>
import Sidebar from '@/components/DashBoard/Sidebar.vue'
import Header from '@/components/DashBoard/Header.vue'
// import { mapState } from 'vuex'
import store from '@/store/index'

export default {
  components: {
    Sidebar,
    Header
  },
  data () {
    return {
    }
  },
  computed: {
    isLogged () {
      return store.state.login.isLogged
    } // da fare con mapState
    // ...mapState(['login/isLogged'])
    // ...mapGetters(['username', 'password'])
  },
  created () {
    // Add event handler for frecciette del browser
    window.onpopstate = function (event) {
      // Inplicit Logout
      if (window.location.pathname === '/login') {
        store.commit('setLogin', { value: true })
        // localStorage.removeItem('refreshToken')
        // localStorage.removeItem('accessToken')
      }
      //  && !store.state.isLogged
      // console.log(window.location.pathname)
    }
  },
  mounted () {
    //
    if (this.refreshToken && this.refreshToken) {
      store.commit('setLogin', { value: true })
    }
  }
}
</script>

<style>
/* Google Font Import - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

</style>
