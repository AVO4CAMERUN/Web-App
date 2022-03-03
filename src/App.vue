<template>
  <!-- Conditional rendering -->
  <template v-if="isLogged">
    <!-- Sidebar gestire role qui-->
    <Sidebar></Sidebar>
    <!-- Main -> Header + content -->
    <section class="home">
      <Header></Header>
      <router-view/>
    </section>
  </template>
  <!-- Conditional rendering if false -->
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
      username: 'ssss'
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
:root {
  /* Colors */
  --body-color: #f0f3f6;
  --sidebar-color: #fff;
  --primary-color: #63b377;
  --primary-color-light: #f6f5ff;
  --toggle-color: #ddd;
  --text-color: #707070;

  /* Transition */
  --tran-03: all 0.2s ease;
  --tran-03: all 0.2s ease;
  --tran-04: all 0.2s ease;
  --tran-05: all 0.2s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
  background-color: var(--body-color);
  transition: var(--tran-05);
}

::selection {
  background-color: var(--primary-color);
  color: #fff;
}
</style>
