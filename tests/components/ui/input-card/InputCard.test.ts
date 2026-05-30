import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { InputCard } from '@/components/ui/input-card'

describe('InputCard', () => {
  const programOptions = [
    { value: 'clp', label: 'CLP (Pesos Chilenos)' },
    { value: 'cmr', label: 'CMR Puntos' }
  ]

  it('renderiza label y opciones', () => {
    const wrapper = mount(InputCard, {
      props: {
        label: 'Conversión Base',
        programOptions,
        selectedProgram: 'clp',
        inputValue: '',
      }
    })
    expect(wrapper.text()).toContain('Conversión Base')
    expect(wrapper.findAll('option').length).toBe(2)
  })

  it('emite update:selectedProgram al cambiar select', async () => {
    const wrapper = mount(InputCard, {
      props: {
        label: 'Conversión',
        programOptions,
        selectedProgram: 'clp',
        inputValue: ''
      }
    })
    await wrapper.find('select').setValue('cmr')
    expect(wrapper.emitted('update:selectedProgram')).toBeTruthy()
    expect(wrapper.emitted('update:selectedProgram')![0]).toEqual(['cmr'])
  })

  it('emite update:inputValue al escribir en input', async () => {
    const wrapper = mount(InputCard, {
      props: {
        label: 'Conversión',
        programOptions,
        selectedProgram: 'clp',
        inputValue: ''
      }
    })
    await wrapper.find('input').setValue('1234')
    expect(wrapper.emitted('update:inputValue')).toBeTruthy()
    expect(wrapper.emitted('update:inputValue')![0]).toEqual(['1234'])
  })

  it('muestra mensaje de validación si se provee', () => {
    const wrapper = mount(InputCard, {
      props: {
        label: 'Conversión',
        programOptions,
        selectedProgram: 'clp',
        inputValue: '',
        validationMsg: 'Mínimo $1.000 pesos'
      }
    })
    expect(wrapper.text()).toContain('Mínimo $1.000 pesos')
  })
})
