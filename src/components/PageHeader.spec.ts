import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import PageHeader from './PageHeader.vue'

// Import h from Vue to use in the mock
import { h } from 'vue'

// Mock the QueryOrBarcodeForm component
vi.mock('./QueryOrBarcodeForm.vue', () => ({
  default: {
    name: 'QueryOrBarcodeForm',
    render() {
      return h('div', { class: 'mock-query-form' }, 'Mock Query Form')
    },
  },
}))

describe('PageHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof PageHeader>>

  beforeEach(() => {
    wrapper = mount(PageHeader, {
      global: {
        stubs: {
          QueryOrBarcodeForm: true,
        },
      },
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the OpenFoodFacts logo', () => {
    const logo = wrapper.find('img.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('OpenFoodFacts logo')
    expect(logo.attributes('src')).toContain('openfoodfacts-horizontal-logo.svg')
  })

  it('includes a homepage link with the logo', () => {
    const logoLink = wrapper.find('.navbar-start a')
    expect(logoLink.exists()).toBe(true)
    expect(logoLink.attributes('href')).toBe('/')
  })

  it('contains a GitHub link in the navbar-end section', () => {
    const githubLink = wrapper.find('.navbar-end a')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('href')).toBe('https://github.com/rsginer/vuefoodie')
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('aria-label')).toBe('GitHub')
  })

  it('has a GitHub icon inside the link', () => {
    const githubIcon = wrapper.find('.navbar-end a span')
    expect(githubIcon.exists()).toBe(true)
    expect(githubIcon.classes()).toContain('icon-[mdi--github]')
  })

  it('has the correct CSS classes for layout', () => {
    expect(wrapper.find('.navbar').exists()).toBe(true)
    expect(wrapper.find('.navbar-start').exists()).toBe(true)
    expect(wrapper.find('.navbar-center').exists()).toBe(true)
    expect(wrapper.find('.navbar-end').exists()).toBe(true)
  })
})
