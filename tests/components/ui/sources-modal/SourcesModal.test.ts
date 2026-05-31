import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SourcesModal from '@/components/ui/sources-modal/SourcesModal.vue'
import { programs } from '@/app/data/programs'

describe('SourcesModal', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('no renderiza contenido cuando open es false', () => {
    mount(SourcesModal, {
      props: { open: false, programs },
      attachTo: document.body
    })
    expect(document.body.textContent).not.toContain('Fuentes')
  })

  it('renderiza contenido cuando open es true', () => {
    mount(SourcesModal, {
      props: { open: true, programs },
      attachTo: document.body
    })
    expect(document.body.textContent).toContain('Fuentes')
    expect(document.body.textContent).toContain('Los valores son referenciales')
    for (const p of programs) {
      expect(document.body.textContent).toContain(p.name)
    }
  })

  it('emite close al hacer clic en botón cerrar', async () => {
    const wrapper = mount(SourcesModal, {
      props: { open: true, programs },
      attachTo: document.body
    })
    const btn = document.body.querySelector('button[aria-label="Cerrar"]') as HTMLElement
    expect(btn).toBeTruthy()
    btn.click()
    await new Promise(r => setTimeout(r, 50))
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
