import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ActionButton from '@/components/ui/action-button/ActionButton.vue'

describe('ActionButton', () => {
  it('renderiza el texto y el icono', () => {
    const wrapper = mount(ActionButton, {
      props: { icon: 'mail', color: 'primary' },
      slots: { default: 'Enviar' }
    })
    expect(wrapper.text()).toContain('Enviar')
    expect(wrapper.find('.material-symbols-outlined').exists()).toBe(true)
    expect(wrapper.find('.material-symbols-outlined').text()).toBe('mail')
  })

  it('aplica color whatsapp', () => {
    const wrapper = mount(ActionButton, {
      props: { icon: 'share', color: 'whatsapp' },
      slots: { default: 'WhatsApp' }
    })
    expect(wrapper.classes()).toContain('bg-[#25D366]')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('emite click', async () => {
    const wrapper = mount(ActionButton, {
      props: { icon: 'mail' },
      slots: { default: 'Enviar' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
