import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import QueryOrBarcodeForm from './QueryOrBarcodeForm.vue'

// Define the component instance type
interface ComponentInstance {
  searchQuery: string
}

describe('QueryOrBarcodeForm', () => {
  let wrapper: VueWrapper<ComponentInstance>

  beforeEach(() => {
    wrapper = mount(QueryOrBarcodeForm) as VueWrapper<ComponentInstance>
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has a text input with placeholder', () => {
    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Query or barcode')
    expect(input.classes()).toContain('input')
    expect(input.classes()).toContain('input-bordered')
    expect(input.classes()).toContain('join-item')
  })

  it('has a disabled "Go" button initially', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Go')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('btn')
    expect(button.classes()).toContain('btn-secondary')
    expect(button.classes()).toContain('join-item')
  })

  it('enables the button when text is entered', async () => {
    const input = wrapper.find('input[type="text"]')
    const button = wrapper.find('button')

    // Initial state: button should be disabled
    expect(button.attributes('disabled')).toBeDefined()

    // Type something in the input
    await input.setValue('test query')

    // Button should now be enabled
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('updates the v-model when text is entered', async () => {
    const input = wrapper.find('input[type="text"]')

    // Type something in the input
    await input.setValue('test barcode')

    // Check that the component's internal data is updated
    expect(wrapper.vm.searchQuery).toBe('test barcode')
  })
})
