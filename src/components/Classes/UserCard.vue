<template>
  <tr class="hover:bg-gray-100 items-center center">
    <td class="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
      <img class="h-10 w-10 rounded-full"
        src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
        alt="Neil Sims avatar">
      <div class="text-sm font-normal text-gray-500">
        <div class="text-base font-semibold text-gray-900">{{lastname}} {{firstname}}</div>
        <div class="text-sm font-normal text-gray-500">{{email}}</div>
      </div>
    </td>
    <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">{{role}}</td>
    <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">{{registrationDate}}</td>
    <td class="p-4 whitespace-nowrap text-base font-normal text-gray-900">
      <div class="flex items-center">
        <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Active
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'UserCard',
  data: function () {
    return {}
  },
  props: {
    email: String,
    firstname: String,
    lastname: String,
    role: String,
    img: String,
    registrationDate: String
  },
  methods: {},
  components: {},
  mounted () {}
}
</script>

<style>
</style>
