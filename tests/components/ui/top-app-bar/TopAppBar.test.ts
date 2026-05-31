import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { TopAppBar } from '@/components/ui/top-app-bar'

describe('TopAppBar', () => {
  it('renderiza el título', () => {
    const wrapper = mount(TopAppBar, { props: { title: 'Test Title' } })
    expect(wrapper.text()).toContain('Test Title')
  })

  it('emite toggle-theme al hacer click en el botón de tema', async () => {
    const wrapper = mount(TopAppBar, { props: { title: 'Test' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('toggle-theme')).toBeTruthy()
  })

  it('emite logo-click al hacer click en el logo', async () => {
    const wrapper = mount(TopAppBar, { props: { title: 'Test' } })
    // Busca el div clickeable (tiene cursor-pointer)
    const logoDiv = wrapper.find('div.cursor-pointer')
    expect(logoDiv.exists()).toBe(true)
    await logoDiv.trigger('click')
    expect(wrapper.emitted('logo-click')).toBeTruthy()
  })
})
