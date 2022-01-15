import { shallowMount } from '@vue/test-utils'
import Header from '@/components/app/Header.vue'

describe('header.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Header, {})
  })
})
