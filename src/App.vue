<template>

  <!--  -->
  <template v-if="isLogged">
    <!-- Sidebar gestire role qui-->
    <Sidebar></Sidebar>
    <!-- Main -> Header + content -->
    <section class="home">
      <Header></Header>
      <router-view />
    </section>
  </template>

  <!--  -->
  <router-view v-else/>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
// import Main from '@/components/Main.vue'  <Main></Main>
import Header from '@/components/Header.vue'
import store from './store/index'

export default {
  components: {
    Sidebar,
    Header
  },
  data () {
    return {}
  },
  computed: {
    isLogged () {
      return store.state.isLogged
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
