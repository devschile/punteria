import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SiteFooter from '@/components/ui/site-footer/SiteFooter.vue'

describe('SiteFooter', () => {
  it('renderiza el texto principal', () => {
    const wrapper = mount(SiteFooter)
    expect(wrapper.text()).toContain('Los valores son referenciales')
    expect(wrapper.text()).toContain('© 2026 PuntosCL')
  })
})
