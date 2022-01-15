import { shallowMount } from '@vue/test-utils'
import Main from '@/components/app/Main.vue'

describe('main.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Main, {})
  })
})
