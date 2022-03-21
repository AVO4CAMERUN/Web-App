<template>
  <div class="align-middle min-w-full">
    <div class="w-full px-4 pt-1 pb-3">
      <div class="relative">
        <img :src="`data:image/png;base64,${img}`" alt="" class="float-left w-10 sm:w-16 h-10 sm:h-16 object-cover rounded-full">
        <div class="flex flex-col leading-tight text-3xl h-16 pl-4">
          <div class="text-2xl mt-1 flex items-center">
            <span class="text-gray-700 mr-3">{{name}}</span>
          </div>
          <span class="text-lg text-gray-600">10 partecipants</span>
          </div>
      </div>
    </div>
    <div class="place-items-center w-full mb-6 mx-3 gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
      <div class="p-2 h-96 grid-col-1 lg:w-full md:w-[75%] sm:w-[50%] bg-green-400"><p>aaa</p></div>
      <div class="p-2 h-96 grid-col-1 hidden lg:w-full md:block md:w-[75%] bg-green-400"><p>aaa</p></div>
      <div class="p-2 h-96 grid-col-1 hidden lg:w-full md:block md:w-[75%] bg-green-400"><p>aaa</p></div>
    </div>
    <div class="shadow overflow-hidden">
      <table class="table-fixed min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase hidden lg:[display:_table-cell]">
              Birth Date
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase hidden lg:[display:_table-cell]">
              Gender
            </th>
            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase hidden lg:[display:_table-cell]">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <UserCard/>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/Classes/UserCard.vue'

export default {
  name: 'Class',
  data: function () {
    return {}
  },
  props: {},
  methods: {
    fetchUsers () {
      /* cls.getClassesByFilter('')
        .then((response) => {
          if (response.status === 200) return response.json()
        })
        .then((response) => {
          this.classes = response
        }) */
    }
  },
  components: {
    UserCard
  },
  mounted () {},
  computed: {
    id: {
      get () { return this.$store.state.classes.id }
    },
    img: {
      get () { return this.$store.state.classes.img }
    },
    name: {
      get () { return this.$store.state.classes.name }
    }
  }
}
</script>

<style>
</style>
