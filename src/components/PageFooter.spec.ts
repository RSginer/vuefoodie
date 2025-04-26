import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PageFooter from './PageFooter.vue'

describe('PageFooter', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(PageFooter)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has a flex container with proper alignment classes', () => {
    const container = wrapper.find('div')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
  })

  it('contains link to OpenFoodFacts website', () => {
    const offLink = wrapper.findAll('a')[0]
    expect(offLink.exists()).toBe(true)
    expect(offLink.attributes('href')).toBe('https://openfoodfacts.org/')
    expect(offLink.attributes('target')).toBe('_blank')
    expect(offLink.attributes('rel')).toBe('noopener noreferrer')
  })

  it('displays OpenFoodFacts logo', () => {
    const offLogo = wrapper.findAll('img')[0]
    expect(offLogo.exists()).toBe(true)
    expect(offLogo.attributes('alt')).toBe('OpenFoodFacts logo')
    expect(offLogo.attributes('src')).toContain('openfoodfacts-horizontal-logo.svg')
    expect(offLogo.attributes('width')).toBe('325')
    expect(offLogo.attributes('height')).toBe('125')
  })

  it('contains a plus sign separator between logos', () => {
    const separator = wrapper.find('span')
    expect(separator.exists()).toBe(true)
    expect(separator.text()).toBe('+')
    expect(separator.classes()).toContain('text-3xl')
    expect(separator.classes()).toContain('ml-2')
  })

  it('contains link to Vue.js website', () => {
    const vueLink = wrapper.findAll('a')[1]
    expect(vueLink.exists()).toBe(true)
    expect(vueLink.attributes('href')).toBe('https://vuejs.org/')
    expect(vueLink.attributes('target')).toBe('_blank')
    expect(vueLink.attributes('rel')).toBe('noopener noreferrer')
  })

  it('displays Vue logo', () => {
    const vueLogo = wrapper.findAll('img')[1]
    expect(vueLogo.exists()).toBe(true)
    expect(vueLogo.attributes('alt')).toBe('Vue logo')
    expect(vueLogo.attributes('src')).toContain('logo.svg')
    expect(vueLogo.attributes('width')).toBe('55')
    expect(vueLogo.attributes('height')).toBe('55')
  })
})
