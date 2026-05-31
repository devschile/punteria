import { ref, watch, type ComputedRef, type Ref } from 'vue'

interface ResultCard {
  programName: string
}

export function useDragReorder(resultCards: ComputedRef<ResultCard[]>) {
  const CARD_ORDER_KEY = 'card-order'
  const CARD_REORDERED_KEY = 'card-reordered'

  const hasReordered = ref(false)
  const cardOrder = ref<string[]>(loadCardOrder())
  const draggedName = ref<string | null>(null)
  const isDragging = ref(false)
  const dropIndex = ref(-1)
  let touchStartY = 0

  // ── Persistencia ──

  function loadCardOrder(): string[] {
    if (import.meta.server) return []
    try {
      hasReordered.value = localStorage.getItem(CARD_REORDERED_KEY) === 'true'
      const saved = localStorage.getItem(CARD_ORDER_KEY)
      if (saved) return JSON.parse(saved) as string[]
    } catch { /* ignore */ }
    return []
  }

  function saveCardOrder() {
    if (import.meta.server) return
    try { localStorage.setItem(CARD_ORDER_KEY, JSON.stringify(cardOrder.value)) }
    catch { /* ignore */ }
  }

  function persistReordered() {
    hasReordered.value = true
    if (!import.meta.server) {
      try { localStorage.setItem(CARD_REORDERED_KEY, 'true') }
      catch { /* ignore */ }
    }
  }

  // ── Mantener cardOrder sincronizado con resultCards ──

  watch(resultCards, (cards) => {
    const currentNames = new Set(cards.map(c => c.programName))
    cardOrder.value = cardOrder.value.filter(n => currentNames.has(n))
    for (const name of cards.map(c => c.programName)) {
      if (!cardOrder.value.includes(name)) cardOrder.value.push(name)
    }
    saveCardOrder()
  }, { immediate: true })

  // ── Reseteo ──

  function resetDragState() {
    draggedName.value = null
    isDragging.value = false
    dropIndex.value = -1
    document.querySelectorAll('.program-card').forEach(el => {
      const card = el as HTMLElement
      card.classList.remove('opacity-30')
      if (!card.classList.contains('bg-surface-container-lowest')) {
        card.classList.add('bg-surface-container-lowest')
      }
    })
  }

  // ── Desktop Drag ──

  function onDragStart(name: string, e: DragEvent) {
    draggedName.value = name
    isDragging.value = true
    dropIndex.value = -1
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', name)
    }
    const el = e.currentTarget as HTMLElement
    requestAnimationFrame(() => el.classList.add('opacity-30'))
  }

  function onDragOver(e: DragEvent) {
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
    if (!draggedName.value) return
    const cards = document.querySelectorAll('.program-card')
    let closestGap = 0
    let closestDist = Infinity
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect()
        ;[rect.top, rect.bottom].forEach((y, j) => {
          const dist = Math.abs(e.clientY - y)
          if (dist < closestDist) { closestDist = dist; closestGap = i + j }
        })
    })
    dropIndex.value = closestGap
  }

  function onDrop(_e: DragEvent) {
    if (!draggedName.value || dropIndex.value < 0) { resetDragState(); return }
    const newOrder = cardOrder.value.filter(n => n !== draggedName.value)
    newOrder.splice(dropIndex.value, 0, draggedName.value)
    cardOrder.value = newOrder
    persistReordered()
    saveCardOrder()
    resetDragState()
  }

  function onDragEnd() { resetDragState() }

  function onDragLeaveContainer(e: DragEvent) {
    const container = e.currentTarget as HTMLElement
    const related = e.relatedTarget as HTMLElement | null
    if (related && container.contains(related)) return
    dropIndex.value = -1
  }

  // ── Mobile Touch Drag ──

  function onTouchStart(name: string, e: TouchEvent) {
    const target = e.target as HTMLElement
    if (!target.closest('.drag-handle')) return
    e.preventDefault()
    draggedName.value = name
    isDragging.value = true
    dropIndex.value = -1
    touchStartY = e.touches[0].clientY
    const el = e.currentTarget as HTMLElement
    requestAnimationFrame(() => {
      el.classList.remove('bg-surface-container-lowest')
      el.classList.add('opacity-30')
    })
  }

  function onTouchMove(e: TouchEvent) {
    if (!draggedName.value) return
    const y = e.touches[0].clientY
    const cards = document.querySelectorAll('.program-card')
    let closestGap = 0
    let closestDist = Infinity
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect()
        ;[rect.top, rect.bottom].forEach((yEdge, j) => {
          const dist = Math.abs(y - yEdge)
          if (dist < closestDist) { closestDist = dist; closestGap = i + j }
        })
    })
    dropIndex.value = closestGap
  }

  function onTouchEnd() {
    if (!draggedName.value) { resetDragState(); return }
    if (dropIndex.value >= 0) {
      const newOrder = cardOrder.value.filter(n => n !== draggedName.value)
      newOrder.splice(dropIndex.value, 0, draggedName.value)
      cardOrder.value = newOrder
      persistReordered()
      saveCardOrder()
    }
    resetDragState()
  }

  return {
    hasReordered,
    cardOrder,
    isDragging,
    dropIndex,
    saveCardOrder,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    onDragLeaveContainer,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
