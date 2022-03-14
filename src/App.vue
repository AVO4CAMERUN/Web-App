<template>
  <template v-if="isLogged">
    <div class="flex">
      <Sidebar></Sidebar>
      <section class="grow bg-[#f0f3f6]">
        <Header></Header>
          <div class="overflow-y-auto overflow-x-hidden bg-[#f0f3f6] scrollbar max-h-[calc(100vh_-_76px)]">
            <router-view/> <!-- main -->
          </div>
      </section>
    </div>
  </template>
  <router-view v-else/>
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

.home {
  position: absolute;
  top: 0;
  top: 0;
  left: 250px;
  height: 100vh;
  width: calc(100% - 250px);
  background-color: var(--body-color);
  transition: var(--tran-05);
}
.home .text {
  font-size: 30px;
  font-weight: 500;
  color: var(--text-color);
  padding: 12px 60px;
}
.sidebar.close ~ .home {
  left: 78px;
  height: 100vh;
  width: calc(100% - 78px);
}
</style>
