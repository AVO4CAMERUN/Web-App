<template>
  <!-- Main -->
  <div class="absolute top-[7%] right-[125px] z-50">
    <div class="max-h-[174px] max-w-sm overflow-y-auto" :class="notifications === false ? 'rounded-xl' : 'rounded-l-xl'">

      <!-- Notification -->
      <div v-if="notifications">
        <div class="max-w-sm p-4 pr-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400"
          v-for="(invite) in classInvites"
          :key="invite.id"
        >
          <div class="flex flex-row gap-2 w-full h-full">

            <!-- Header Icon -->
            <div class="flex justify-center items-center w-12 h-12 aspect-square rounded-full bg-green-100 dark:text-blue-300 dark:bg-blue-900">
              <i class="fa-solid fa-envelope-open-text text-[28px] text-green-600 dark:text-gray-400"/>
            </div>

            <!-- Content -->
            <div class="flex flex-col justify-between gap-6 p-2">
              <div class="flex flex-col gap-2">
                <!-- Title -->
                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                  Join the class
                </span>

                <!-- Description -->
                <div class="text-sm font-normal break-word">
                  You have been invited to join the class "{{invite.className}}""
                </div>
              </div>

              <!-- Buttons -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <button class="w-full px-2 py-1.5 justify-center text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300
                    dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    @click="acceptInvite(invite.id)"
                  >
                    Accept
                  </button>
                </div>
                <div>
                  <button class="w-full px-2 py-1.5 justify-center text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600
                    dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    @click="rejectInvite(invite.id)"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>

            <!-- Remove and Ignore Notification Icon -->
            <!-- <button class="h-8 w-8 p-1.5 bg-white text-gray-400 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 dark:text-gray-500 dark:bg-gray-800
              dark:hover:text-white dark:hover:bg-gray-700"
              @click="invite.ignored = true; notifications--"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button> -->
          </div>
        </div>
      </div>

      <!-- No notifications -->
      <div v-else class="flex flex-row justify-left items-center gap-4 p-4 text-sm text-blue-600 bg-blue-200">
        <i class="fa-solid fa-circle-info text-[20px]"></i>
        <p>No notification to read</p>
      </div>
    </div>
  </div>
</template>

<script>
import { invitesServices as is } from '@/servises/invites.services'
import { classesService as cs } from '@/servises/classes.services'
import router from '@/router/index'
import store from '@/store/index'

export default {
  name: 'Notification',
  data () {
    return {
      notifications: true,
      classInvites: []
    }
  },
  mounted () {
    this.fetchInvites()
  },
  methods: {
    fetchInvites () {
      is.getInviteByEmail()
        .then((response) => {
          if (response?.status === 200) return response.json()
        })
        .then((json = []) => {
          // no notification
          console.log(json)
          if (json.length === 0) this.notifications = false
          else {
            // notification array
            this.notifications = true
            this.classInvites = json
            this.classInvites.forEach(invite => {
              cs.getClassByID(invite.id_class)
                .then(response => {
                  if (response.status === 200) return response.json()
                })
                .then(json => {
                  invite.className = json?.name
                })
            })
          }
        })
    },
    acceptInvite (id) {
      is.acceptInviteByID(id)
        .then((response) => {
          if (response?.status === 200) {
            this.fetchInvites()
            store.dispatch('classes/setCurrentClass', id)
              .then(() => {
                const i = this.classInvites.findIndex(invite => invite.id === id)
                this.classInvites.splice(i, 1)
                router.push({ name: 'class' })
              })
          }
        })
    },
    rejectInvite (id) {
      is.rejectInviteByID(id)
        .then((response) => {
          if (response?.status === 200) this.fetchInvites()
        })
    }
  }
}
</script>

<style>
  #notification ::-webkit-scrollbar {
    width: 12px;
  }
  #notification ::-webkit-scrollbar-thumb {
    background-color: whitesmoke;
    border-radius: 20px;
    border: 4px solid #1f2937;
  }
  #notification ::-webkit-scrollbar-track {
    background: #1f2937;
  }
</style>
