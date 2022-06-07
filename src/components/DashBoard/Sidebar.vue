<template>
  <div>
    <nav
      class="bg-white dark:bg-dark-sidebar absolute z-50 md:relative w-full h-screen py-[10px] transition-[width] duration-300 md:w-[250px] md:px-[14px]"
      :class="{'w-[0px] md:w-[88px]': isClose}"
    >
      <header class="relative ml-[14px] md:m-0">
        <div class="mt-[10px] flex align-middle"> <!-- image-text -->
          <span class="flex align-middle justify-center min-w-[60px]"> <!-- image -->
            <img class="w-[40px] rounded-[6px] dark:invert" src="@/assets/logo.png"
            alt="logo AVO4CAM" draggable="false">
          </span>
          <div
            class="text-lg font-bold mt-[4px] transition-[transform,_opacity] duration-300 origin-left dark:text-white"
            :class="{'scale-0 opacity-0': isClose}"
          >
          Avo4Camerun
          </div>
        </div>

        <button class="absolute top-[20%] left-14 w-6 aspect-square bg-primary text-white rounded-full md:block md:-right-[1.75rem]"
          @click="isClose = !isClose"
          :class="{'ml-[170px]': !isClose}"
        >
        <!-- Da capire come fare la transizione sulla positizione
        del bottone no mobile, senza usare transition-all -->
          <i class="flex justify-center items-center text-[22px] translate-y-[1px] transition-transform bx bx-chevron-right"
            :class="{'rotate-180 translate-y-[-1px]': !isClose}"
          />
        </button>
      </header>

      <!-- div elenco button -->
      <section
      class="relative invisible w-[222px] h-[90%] ml-[14px] text-[#707070] text-[17px] font-semibold dark:text-white md:m-0 md:w-auto md:visible"
      :class="{'!visible': !isClose}"
      >
        <ul>
          <li v-for="button in buttons" :key="button.message">
            <router-link
              :to="button.path"
              class="flex items-center h-[50px] mt-[25px] align-middle rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300 "
              :class="[button.message == 'Logout'?`absolute w-full bottom-0 mt-[10px]`:'', button.path == this.$route.path ? 'bg-primary text-white' : '']"
              @click="button.event"
              draggable="false"
            >
            <i class="min-w-[60px] text-[20px] text-center" :class="button.icon" />
            <span :class="{'scale-0 opacity-0': isClose}" class="transition-[transform,_opacity] duration-300 origin-left whitespace-nowrap">{{ button.message }}</span>
            </router-link>
          </li>
        </ul>
      </section>
    </nav>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  data: function () {
    return {
      isClose: true,
      buttons: [
        { icon: 'bx bx-search icon', message: 'Search', path: '/search', event: this.empty },
        { icon: 'bx bx-book-bookmark icon', message: 'My Courses', path: '/inscriptions', event: this.empty },
        { icon: 'bx bx-chalkboard icon', message: 'My Class', path: '/class', event: this.empty },
        { icon: 'bx bxs-book-add', message: 'Created Courses', path: '/createdcourses', event: this.empty },
        { icon: 'bx bx-clinic', message: 'Created Classes', path: '/createdclasses', event: this.empty },
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
          // Kicking out from web app
          this.$router.push('/login')
          store.commit('login/setLogin', { value: false })
        })
    },
    setRoute () {
      if (this.role === 'TEACHER') {
        const index = this.buttons.findIndex(element => element.message === 'My Class')
        this.buttons[index].message = 'My Classes'
        this.buttons[index].path = '/myclasses'
      } else if (this.role === 'STUDENT') this.buttons.splice(3, 2)
    }
  },
  computed: {
    ...mapState(
      'login', ['role']
    )
  },
  watch: {
    role () {
      this.setRoute()
    }
  },
  created () {
    // if user is a prof
    this.setRoute()
  }
}
</script>

<style>
</style>
