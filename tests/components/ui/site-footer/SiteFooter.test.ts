import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SiteFooter from '@/components/ui/site-footer/SiteFooter.vue'

describe('SiteFooter', () => {
  it('renderiza el texto principal', () => {
    const wrapper = mount(SiteFooter, { props: { title: 'PuntosCL' } })
    expect(wrapper.text()).toContain('Los valores son referenciales')
    expect(wrapper.text()).toContain('© 2026')
    expect(wrapper.text()).toContain('PuntosCL')
  })

  it('tiene botón Ver detalle que abre el modal', async () => {
    const wrapper = mount(SiteFooter, { props: { title: 'PuntosCL' } })
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toContain('Ver detalle')
    await btn.trigger('click')
    // El modal usa Teleport, verificamos que showModal cambió
    expect(wrapper.findComponent({ name: 'SourcesModal' }).exists()).toBe(true)
  })
})
