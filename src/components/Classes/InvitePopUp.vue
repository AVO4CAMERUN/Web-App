<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <!-- Main -->
    <div class="w-[450px] bg-white rounded-lg shadow-xl border">
      <div class="flex flex-row px-4 py-8 bg-white">
        <!-- Icon -->
        <div class="flex flex-col items-center justify-center w-14 h-14 aspect-square rounded-full bg-green-100">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="green">
            <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/>
          </svg>
        </div>
        <div class="flex flex-col gap-2 w-full h-full px-4 pt-3">
          <!-- Title -->
          <h3 class="text-xl leading-6 pb-6 font-medium text-gray-900 tracking-wide">Invite a new student!</h3>
          <!-- Input -->
          <input class="w-full py-2 px-2 rounded-md text-sm bg-transparent border border-gray-300 text-gray-700 focus:outline-none"
            type="text"
            placeholder="Student's email address"
            v-model="email"
          >
        </div>
        <!-- Add Button -->
        <i class="fa-solid fa-square-plus self-end cursor-pointer text-[36px] text-green-700 hover:text-green-800"
          @click="addUser"
        />
      </div>
      <!-- Added Users -->
      <div class="flex flex-row justify-center w-full border-grey border-b py-1 "
        v-for="(email, index) in users"
        :key="email"
      >
        <span class="justify-start">{{email}}</span>
        <i class="bx bxs-minus-circle text-rose-600 cursor-pointer text-[32px]"
          @click="removeUser(index)"
        />
      </div>
      <!-- Buttons -->
      <div class="flex flex-row-reverse justify-start px-4 py-3 gap-2">
        <button
          class="px-4 py-2 inline-flex justify-center rounded-md border border-transparent shadow-sm bg-green-700 text-base font-medium text-white hover:bg-green-800
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
          type="button"
          @click="email !== '' ? createInvite() : null"
        >
          Confirm
        </button>

        <button
          class="px-4 py-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          type="button"
          @click="this.$emit('hide')"
        >
            Cancel
          </button>
      </div>
    </div>
  </div>
  <PopUp
    v-if="showPopUp"
    :type="'error'"
    :message="'Unable to send invites'"
    :content="'One or more email are not registered on Avo4Camerun'"
    @noAction="removePopUp"
  />
</template>

<script>
import { invitesServices as is } from '@/servises/invites.services'
import { emailChecker } from '@/Utils/input_checker.util'
import PopUp from '@/components/Base/PopUp.vue'

export default {
  name: 'InvitePopUp',
  data: function () {
    return {
      email: '',
      users: [],
      showPopUp: false
    }
  },
  props: ['classId'],
  emits: ['hide'],
  components: { PopUp },
  methods: {
    createInvite () {
      const obj = { class_id: this.classId, students: this.users }
      /*
        400 - At least one user email not registered
      */
      is.createInvite(obj)
        .then((response) => {
          if (response?.status === 200) this.$emit('hide')
          else if (response?.status === 400) this.showPopUp = true
        })
    },
    addUser () {
      const check = emailChecker(this.email)
      const i = this.users.findIndex(e => e === this.email)
      if (i === -1 && check) this.users.push(this.email)
    },
    removeUser (index) {
      this.users.splice(index, 1)
    },
    removePopUp () {
      this.showPopUp = false
    }
  }
}
</script>
