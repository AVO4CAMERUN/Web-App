<template>
  <nav
    class="fixed bg-white w-[250px] h-full py-[10px] px-[14px] transition-all duration-200 v-nome"
    :class="{'w-[88px]': isClose}"
  > <!-- per chiusura: toggle "w-[88px]" -->
    <header class="relative">
      <div class="mt-[10px] flex align-middle"> <!-- image-text -->
        <span class="flex align-middle justify-center min-w-[60px]"> <!-- image -->
          <img class="w-[40px] rounded-[6px]" src="@/assets/logo.png"
          alt="logo AVO4CAM" draggable="false">
        </span>
        <div class="text-lg font-bold mt-[4px]" :class="{hidden: isClose}">Avo4Camerun</div> <!-- text -->
      </div>

      <i class="absolute top-[20%] -right-[1.75rem] w-6 aspect-square bg-[#63b377] text-white
      flex justify-center items-center text-[22px] pt-[2px] rounded-full bx bx-chevron-right"
      @click="isClose = !isClose"
      ></i>
    </header>

    <!-- div elenco button -->
    <section class="relative h-[90%] text-[#707070] text-[17px] font-semibold"> <!-- per chiusura: toggle "hidden" degli span-->
      <router-link :to="button.path"
        v-for="button in buttons" :key="button.message"
        class="flex items-center h-[50px] mt-[25px] align-middle rounded-md hover:bg-[#63b377] hover:text-white transition-all duration-200"
        :class="button.message == 'Logout'?`absolute w-full bottom-0 mt-[10px]`:''"
        @click="button.event"
      >
      <i class="min-w-[60px] text-[20px] text-center" :class="button.icon" />
      <span :class="{hidden: isClose}">{{ button.message }}</span>
      </router-link>
    </section>
  </nav>
</template>

<script>
import store from '@/store/index'

export default {
  name: 'Sidebar',
  data: function () {
    return {
      isClose: true,
      buttons: [
        { icon: 'bx bx-search icon', message: 'Search', path: '/search', event: this.empty },
        { icon: 'bx bx-book-bookmark icon', message: 'My Courses', path: '/mycourses', event: this.empty },
        { icon: 'bx bx-chalkboard icon', message: 'My Classes', path: '/myclasses', event: this.empty },
        { icon: 'bx bx-cog icon', message: 'Settings', path: '/settings', event: this.empty },
        { icon: 'bx bx-log-out', message: 'Logout', path: '', event: this.logout }
      ]
    }
  },
  methods: {
    empty () {},
    logout () {
      store.dispatch('login/logout')
        .then((response) => {
          if (response.status !== 200) return Promise.reject(new Error('not 200'))

          // Remove saved refreshToken and accessToken
          store.commit('login/setRefreshToken', { refreshToken: '' })
          store.commit('login/setAccessToken', { accessToken: '' })
          store.commit('login/setEmail', { email: '' })
          store.commit('login/setRole', { role: '' })
          store.commit('login/setUsername', { username: '' })

          // Kicking out from web app
          this.$router.push('/login')
          store.commit('login/setLogin', { value: false })
        })
        .catch((ee) => console.log(ee))
    }
  }
}

</script>

<style>
</style>
