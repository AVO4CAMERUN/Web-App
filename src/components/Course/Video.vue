<template>
  <div class="flex flex-col justify-between items-center bg-white rounded-lg w-full p-4 aspect-video shadow-xl dark:bg-dark-sidebar">
    <YouTube
      v-if="!edit && render && lesson?.link_video?.length === 11"
      :src="`${lesson.link_video}`"
      :vars="vars"
      width="100%"
      height="100%"
      ref="youtube"
      class="h-full w-full"
    />
    <template v-else-if="edit && render && lesson.name">
      <svg xmlns="http://www.w3.org/2000/svg" class="rounded-t-lg fill-[#6fab74] dark:fill-blue-900 duration-500" viewBox="0 0 1440 320">
        <path d="M0,160L7.7,170.7C15.5,181,31,203,46,208C61.9,213,77,203,93,181.3C108.4,160,124,128,139,106.7C154.8,85,170,75,186,112C201.3,149,217,235,232,229.3C247.7,224,263,128,279,122.7C294.2,117,310,203,325,234.7C340.6,267,356,245,372,229.3C387.1,213,403,203,418,176C433.5,149,449,107,465,122.7C480,139,495,213,511,250.7C526.5,288,542,288,557,240C572.9,192,588,96,604,58.7C619.4,21,635,43,650,90.7C665.8,139,681,213,697,250.7C712.3,288,728,288,743,250.7C758.7,213,774,139,790,112C805.2,85,821,107,836,149.3C851.6,192,867,256,883,250.7C898.1,245,914,171,929,154.7C944.5,139,960,181,975,170.7C991,160,1006,96,1022,90.7C1037.4,85,1053,139,1068,154.7C1083.9,171,1099,149,1115,128C1130.3,107,1146,85,1161,80C1176.8,75,1192,85,1208,117.3C1223.2,149,1239,203,1254,224C1269.7,245,1285,235,1301,213.3C1316.1,192,1332,160,1347,144C1362.6,128,1378,128,1394,133.3C1409,139,1425,149,1432,154.7L1440,160L1440,0L1432.3,0C1424.5,0,1409,0,1394,0C1378.1,0,1363,0,1347,0C1331.6,0,1316,0,1301,0C1285.2,0,1270,0,1254,0C1238.7,0,1223,0,1208,0C1192.3,0,1177,0,1161,0C1145.8,0,1130,0,1115,0C1099.4,0,1084,0,1068,0C1052.9,0,1037,0,1022,0C1006.5,0,991,0,975,0C960,0,945,0,929,0C913.5,0,898,0,883,0C867.1,0,852,0,836,0C820.6,0,805,0,790,0C774.2,0,759,0,743,0C727.7,0,712,0,697,0C681.3,0,666,0,650,0C634.8,0,619,0,604,0C588.4,0,573,0,557,0C541.9,0,526,0,511,0C495.5,0,480,0,465,0C449,0,434,0,418,0C402.6,0,387,0,372,0C356.1,0,341,0,325,0C309.7,0,294,0,279,0C263.2,0,248,0,232,0C216.8,0,201,0,186,0C170.3,0,155,0,139,0C123.9,0,108,0,93,0C77.4,0,62,0,46,0C31,0,15,0,8,0L0,0Z"></path>
      </svg>{{lesson.name}}
      <div class="flex flex-row-3 justify-center items-center w-[40%] m-4 border-b border-gray-400">
        <input
          type="text"
          class="w-[70%] mb-2 py-2 px-2 rounded-md bg-transparent text-gray-700 leading-tight focus:outline-none dark:text-white"
          placeholder="https://www.youtube.com/watch?v="
          maxlength="11"
          v-model="link"
        >
        <button class="w-[30%] mb-2 bg-green-700 border-4 border-green-700 text-sm text-white py-1 px-2 rounded-md hover:bg-green-900 hover:border-green-900 dark:bg-blue-700 dark:border-blue-700 dark:hover:bg-blue-900 dark:hover:border-blue-900 duration-300"
          type="button"
          @click="addVideo"
        >
          Add Video
        </button>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="rounded-b-lg fill-[#6fab74] dark:fill-blue-900 duration-500" viewBox="0 0 1440 320">
        <path d="M0,256L7.7,234.7C15.5,213,31,171,46,176C61.9,181,77,235,93,218.7C108.4,203,124,117,139,112C154.8,107,170,181,186,218.7C201.3,256,217,256,232,218.7C247.7,181,263,107,279,74.7C294.2,43,310,53,325,90.7C340.6,128,356,192,372,192C387.1,192,403,128,418,122.7C433.5,117,449,171,465,208C480,245,495,267,511,266.7C526.5,267,542,245,557,202.7C572.9,160,588,96,604,101.3C619.4,107,635,181,650,202.7C665.8,224,681,192,697,186.7C712.3,181,728,203,743,213.3C758.7,224,774,224,790,213.3C805.2,203,821,181,836,160C851.6,139,867,117,883,122.7C898.1,128,914,160,929,160C944.5,160,960,128,975,112C991,96,1006,96,1022,101.3C1037.4,107,1053,117,1068,133.3C1083.9,149,1099,171,1115,154.7C1130.3,139,1146,85,1161,96C1176.8,107,1192,181,1208,202.7C1223.2,224,1239,192,1254,186.7C1269.7,181,1285,203,1301,218.7C1316.1,235,1332,245,1347,256C1362.6,267,1378,277,1394,261.3C1409,245,1425,203,1432,181.3L1440,160L1440,320L1432.3,320C1424.5,320,1409,320,1394,320C1378.1,320,1363,320,1347,320C1331.6,320,1316,320,1301,320C1285.2,320,1270,320,1254,320C1238.7,320,1223,320,1208,320C1192.3,320,1177,320,1161,320C1145.8,320,1130,320,1115,320C1099.4,320,1084,320,1068,320C1052.9,320,1037,320,1022,320C1006.5,320,991,320,975,320C960,320,945,320,929,320C913.5,320,898,320,883,320C867.1,320,852,320,836,320C820.6,320,805,320,790,320C774.2,320,759,320,743,320C727.7,320,712,320,697,320C681.3,320,666,320,650,320C634.8,320,619,320,604,320C588.4,320,573,320,557,320C541.9,320,526,320,511,320C495.5,320,480,320,465,320C449,320,434,320,418,320C402.6,320,387,320,372,320C356.1,320,341,320,325,320C309.7,320,294,320,279,320C263.2,320,248,320,232,320C216.8,320,201,320,186,320C170.3,320,155,320,139,320C123.9,320,108,320,93,320C77.4,320,62,320,46,320C31,320,15,320,8,320L0,320Z"></path>
      </svg>
    </template>
    <ErrorPage
      v-else
      :text="'Video not found!'"
      :error="'video'"
    />
  </div>
</template>

<script>
import YouTube from 'vue3-youtube'
import ErrorPage from '@/components/Base/ErrorPage.vue'
import { lessonService as ls } from '@/servises/lesson.services'
import store from '@/store/index'

export default {
  data: function () {
    return {
      render: false,
      vars: {
        rel: '0'
      },
      link: ''
    }
  },
  components: { YouTube, ErrorPage },
  props: ['lesson', 'edit'],
  mounted () {
    setTimeout(this.timeout, 100)
  },
  methods: {
    timeout () {
      this.render = true
      this.link = this.lesson.link_video
    },
    addVideo () {
      if (this.link.length !== 11 && this.link.length !== 0) { console.log('err'); return }
      const body = { link_video: this.link, id_course: this.courseID, id_unit: this.lesson.id_unit }
      ls.updateLessonsByID(this.lesson.id_lesson, body)
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((json) => {})
    }
  },
  watch: {
    lesson (newValue, oldValue) {
      this.link = newValue.link_video
    }
  },
  computed: {
    courseID () { return store.state.course.id },
    courseName () { return store.state.course.name }
  }
}
</script>
