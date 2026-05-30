import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultCard from '@/components/ui/result-card/ResultCard.vue'

describe('ResultCard', () => {
  it('renderiza nombre, puntos y unidad', () => {
    const wrapper = mount(ResultCard, {
      props: {
        programName: 'CMR Puntos',
        programColor: '#003dc7',
        points: '12345',
        unit: 'pts'
      }
    })
    expect(wrapper.text()).toContain('CMR Puntos')
    expect(wrapper.text()).toContain('12345')
    expect(wrapper.text()).toContain('pts')
  })

  it('muestra el icono material-symbols si se provee', () => {
    const wrapper = mount(ResultCard, {
      props: {
        programName: 'CMR',
        programColor: '#003dc7',
        points: '1000',
        programIcon: 'credit_card'
      }
    })
    const icon = wrapper.find('.material-symbols-outlined')
    expect(icon.exists()).toBe(true)
    expect(icon.text()).toBe('credit_card')
  })

  it('muestra el chip si se provee', () => {
    const wrapper = mount(ResultCard, {
      props: {
        programName: 'CMR',
        programColor: '#003dc7',
        points: '1000',
        chipLabel: 'Best Value',
        chipColor: '#e0e0e0',
        chipTextColor: '#003dc7'
      }
    })
    expect(wrapper.text()).toContain('Best Value')
    const chip = wrapper.find('span.ml-2')
    expect(chip.exists()).toBe(true)
    expect(chip.text()).toBe('Best Value')
  })
})
