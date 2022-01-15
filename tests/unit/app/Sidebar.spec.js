import { shallowMount } from '@vue/test-utils'
import Sidebar from '@/components/app/Sidebar.vue'

describe('sidebar.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Sidebar, {})
  })
})
