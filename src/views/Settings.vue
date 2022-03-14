<template>
    <div class="flex flex-col p-8 items-center">
        <div class="w-full h-full flex flex-col gap-4 items-center p-8 rounded-lg bg-white border border-black">
            <div class="w-[75%] flex flex-row">
              <img
                v-if="imgProfile !== null"
                :src="`data:image/png;base64,${imgProfile}`"
                class="rounded-full object-cover cursor-pointer aspect-square h-[10] hover:ring-4 hover:ring-offset-2 hover:ring-[#63b377]"
              >
              <img v-else
                src="@/assets/user_placeholder.png"
                class="rounded-full w-[100px] h-[100px] object-cover cursor-pointer sm:w-[220px] sm:h-[220px] hover:ring-4 hover:ring-offset-2 hover:ring-[#63b377]"
              >
              <h1 class="text-2xl m-12">Gabbo Piangino</h1>
            </div>

            <div class="w-[75%] h-full mt-4 grid grid-cols-3 gap-4 border border-black">
              <div class="border border-black">01</div>
              <div class="border border-black">02</div>
              <div class="row-span-2 border border-black">03</div>
              <div class="col-span-2 border border-black">04</div>
              <div class="border border-black">06</div>
              <div class="col-span-2 border border-black">07</div>
            </div>
        </div>
    </div>
</template>

<script>
// import SearchCard from '../components/Search/SearchCard.vue'
// import { coursesService as cs } from '../servises/course.services'
// import { mapState } from 'vuex'
import store from '@/store/index'

export default {
  name: 'settings',
  data: function () {
    return {
      isClose: true,
      imgProfile: store.state.login.imgProfile,
      menu: [
        { icon: 'bx bx-search icon', message: 'Search', path: '/search' },
        { icon: 'bx bx-book-bookmark icon', message: 'My Courses', path: '/mycourses' },
        { icon: 'bx bx-chalkboard icon', message: 'My Classes', path: '/myclasses' },
        { icon: 'bx bx-cog icon', message: 'Settings', path: '/settings' }
      ]
    }
  },
  components: {},
  mounted () {},
  methods: {},
  computed: {
    // ...mapState(['username', 'password', 'imgProfile'])
  }
}
</script>
