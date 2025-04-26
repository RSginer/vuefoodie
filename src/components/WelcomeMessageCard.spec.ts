import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import WelcomeMessageCard from './WelcomeMessageCard.vue'
import type { ComponentInstance } from 'vue'

describe('WelcomeMessageCard', () => {
  let wrapper: VueWrapper<ComponentInstance<typeof WelcomeMessageCard>>

  beforeEach(() => {
    wrapper = mount(WelcomeMessageCard)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the welcome message with the correct structure', () => {
    const title = wrapper.find('.card-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Welcome to')
    expect(title.text()).toContain('Explorer!')
  })

  it('displays the OpenFoodFacts logo', () => {
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('OpenFoodFacts Explorer')

    // Verify the image sources
    const lightSource = wrapper.find('img').attributes('src')
    expect(lightSource).toBe(
      'https://static.openfoodfacts.org/images/logos/off-logo-horizontal-light.svg',
    )

    const darkSource = wrapper.find('source').attributes('srcset')
    expect(darkSource).toBe(
      'https://static.openfoodfacts.org/images/logos/off-logo-horizontal-dark.svg',
    )
  })

  it('checks that the dark mode source has the correct media query', () => {
    const source = wrapper.find('source')
    expect(source.exists()).toBe(true)
    expect(source.attributes('media')).toBe('(prefers-color-scheme: dark)')
  })

  it('displays the description paragraph with appropriate text', () => {
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(2)

    const firstParagraph = paragraphs[0]
    expect(firstParagraph.text()).toContain('OpenFoodFacts Explorer')
    expect(firstParagraph.text()).toContain('is a tool to explore the OpenFoodFacts database')

    const secondParagraph = paragraphs[1]
    expect(secondParagraph.text()).toContain('You can enter a product code in the search bar')
  })

  it('has a strong tag highlighting OpenFoodFacts Explorer', () => {
    const strongTag = wrapper.find('strong')
    expect(strongTag.exists()).toBe(true)
    expect(strongTag.text()).toBe('OpenFoodFacts Explorer')
  })

  it('has the correct CSS classes for styling', () => {
    const card = wrapper.find('div')
    expect(card.classes()).toContain('dark:bg-base-200')
    expect(card.classes()).toContain('rounded-2xl')
    expect(card.classes()).toContain('shadow-md')

    const cardBody = wrapper.find('.card-body')
    expect(cardBody.exists()).toBe(true)
    expect(cardBody.classes()).toContain('items-center')
    expect(cardBody.classes()).toContain('text-center')
  })
})
