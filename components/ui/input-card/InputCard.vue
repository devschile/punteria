<template>
  <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-lg">
    <label class="font-label-md text-label-md text-on-surface-variant mb-sm block">{{ label }}</label>
    <div class="flex flex-col md:flex-row gap-md">
      <div class="relative flex-1">
        <select
          class="w-full h-14 pl-12 pr-4 rounded-md border-2 border-outline-variant bg-surface focus:border-primary focus:ring-0 appearance-none font-medium text-headline-sm font-headline-sm transition-all cursor-pointer font-['Geist_Mono',monospace]"
          :value="selectedProgram"
          @change="$emit('update:selectedProgram', $event.target.value)"
        >
          <option v-for="option in programOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <span v-if="programIcon" class="material-symbols-outlined absolute left-4 top-4 text-on-surface-variant">{{ programIcon }}</span>
      </div>
      <div class="relative flex-1">
        <span v-if="inputPrefix" class="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold select-none z-10">{{ inputPrefix }}</span>
        <input
          class="w-full h-14 pl-14 pr-4 rounded-md border-2 border-outline-variant bg-surface focus:border-primary focus:ring-0 font-medium text-headline-sm font-headline-sm transition-all font-['Geist_Mono',monospace]"
          :placeholder="inputPlaceholder"
          type="text"
          :value="formattedValue"
          minlength="4"
          maxlength="8"
          :readonly="isMobile"
          :tabindex="isMobile ? 0 : 1"
          @input="$emit('update:inputValue', $event.target.value.replace(/\D/g, ''))"
          @click="onInputClick"
          inputmode="numeric"
          autocomplete="off"
        />
      </div>
    </div>
    <p v-if="validationMsg" class="mt-2 text-error text-label-sm">{{ validationMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, computed } from 'vue'
// Formatear inputValue como miles
const formattedValue = computed(() => {
  const val = String(props.inputValue).replace(/\D/g, '')
  if (!val) return ''
  return Number(val).toLocaleString('es-CL')
})
// Detectar móvil (simple, por ancho de pantalla)
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
})

const emit = defineEmits([
  'update:inputValue',
  'update:selectedProgram',
  'open-keyboard',
])

function onInputClick(e: Event) {
  if (isMobile.value) {
    e.preventDefault()
    emit('open-keyboard')
  }
}

export interface ProgramOption {
  value: string
  label: string
}

const props = defineProps<{
  label: string
  programOptions: ProgramOption[]
  selectedProgram: string
  inputValue: string | number
  inputPlaceholder?: string
  inputPrefix?: string
  programIcon?: string
  validationMsg?: string
}>()
</script>
