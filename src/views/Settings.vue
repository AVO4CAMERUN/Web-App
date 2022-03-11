<template>
  <div>
      <div class="flex flex-col items-center p-8 m-8 rounded-lg bg-white shadow-lg">
        <img
            v-if="imgProfile !== null"
            :src="`data:image/png;base64,${imgProfile}`"
            class="rounded-full w-[100px] h-[100px] object-cover cursor-pointer sm:w-[220px] sm:h-[220px] hover:ring-4 hover:ring-offset-2 hover:ring-[#63b377]"
          >
          <img v-else
            src="@/assets/user_placeholder.png"
            class="rounded-full w-[100px] h-[100px] object-cover cursor-pointer sm:w-[220px] sm:h-[220px] hover:ring-4 hover:ring-offset-2 hover:ring-[#63b377]"
          >
        <h1 class="mt-6 mb-12 text-2xl">Nome Utente</h1>
        <div class="w-[80%] mt-4 flex flex-col">
          <div class="w-full flex flex-col bg-white sm:flex-row">
            <button class="w-full h-16 text-gray-800 font-bold inline-flex justify-center items-center border-b-2 border-gray-100
              focus:border-b-[#63b377] hover:border-b-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="mr-2"
              >
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                ></path>
              </svg>
              <span>Change Nickname</span>
            </button>
            <button class="w-full h-16 text-gray-800 font-bold inline-flex justify-center items-center border-b-2 border-gray-100
              focus:border-b-[#63b377] hover:border-b-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="mr-2"
              >
                <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0
                1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"
                />
              </svg>
              <span>Change Password</span>
            </button>
            <button class="w-full h-16 text-gray-800 font-bold inline-flex justify-center items-center
              border-b-2 border-gray-100 focus:border-b-[#63b377] hover:border-b-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32" height="32" viewBox="0 0 24 24"
                class="mr-2"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209
                11.209A7.946 7.946 0 0 1 12 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0 1 12 4c4.411 0 8 3.589 8 8a7.954
                7.954 0 0 1-1.688 4.897z"/>
              </svg>
              <span>Block users & report</span>
            </button>
            <button class="w-full h-16 text-gray-800 font-bold inline-flex
                justify-center items-center border-b-2 border-gray-100
                focus:border-b-[#63b377] hover:border-b-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="mr-2"
              >
                <path
                  d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                ></path>
              </svg>
              <span>Change theme</span>
            </button>
          </div>

          <div
            class="
              w-full
              h-full
              text-justify
              bg-white
              overflow-y-auto
              scrollbar
              border-2 border-solid border-black
            "
          >
            <h2 class="p-4">
              <!-- CONTENUTO IN BASE ALLA VISTA -->
            </h2>
          </div>
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
