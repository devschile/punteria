export interface Program {
  id: string
  name: string
  icon: string
  rate: number
  /** Calcula la tasa dinámica según el tipo de cambio USD/CLP.
   *  Si no existe, se usa `rate` fijo. */
  getRate?: (usdRate: number) => number
  color: string
  unit: string
  category?: string
  catColor?: string
  sub?: string
}

export const CATEGORY_LABELS: Record<string, string> = {
  vuelos: 'vuelos',
  retail: 'retail',
  banco: 'banco',
  cashback: 'cashback',
  combustible: 'combustible',
}

export const programs: Program[] = [
  { id: 'clp', name: 'Pesos Chilenos', icon: 'payments', rate: 1, color: '#003dc7', unit: '$' },
  { id: 'cencosud', name: 'Puntos Cencosud', icon: 'shopping_bag', rate: 2, color: '#10b981', unit: 'pts', category: 'retail', catColor: '#10b981', sub: 'Jumbo · Paris · Easy · Santa Isabel' },
  { id: 'latam', name: 'LATAM Pass', icon: 'flight_takeoff', rate: 0.1, getRate: (usd) => 1 / (0.032 * usd), color: '#3b82f6', unit: 'Mi', category: 'vuelos', catColor: '#3b82f6', sub: 'Millas aéreas · Santander LATAM' },
  { id: 'lider', name: 'Lider Mi Club', icon: 'storefront', rate: 1.5, color: '#22c55e', unit: 'pts', category: 'cashback', catColor: '#22c55e', sub: 'Walmart Chile · Tarjeta Lider Bci' },
  { id: 'cmr', name: 'CMR Puntos', icon: 'credit_card', rate: 0.142, color: '#f97316', unit: 'pts', category: 'retail', catColor: '#f97316', sub: 'Falabella · Sodimac · Tottus' },
  { id: 'bchile', name: 'Dólares Premio', icon: 'currency_exchange', rate: 0.001, getRate: (usd) => 1 / usd, color: '#ef4444', unit: 'DP$', category: 'banco', catColor: '#ef4444', sub: 'Banco de Chile · Travel Club' },
  { id: 'ripley', name: 'Ripley Puntos', icon: 'local_mall', rate: 0.125, color: '#8b5cf6', unit: 'pts', category: 'retail', catColor: '#8b5cf6', sub: 'Tiendas Ripley · Banco Ripley' },
  { id: 'sky', name: 'SKY Plus', icon: 'airplane_ticket', rate: 0.05, getRate: (usd) => 1 / (0.01 * usd), color: '#0099cc', unit: 'pts', category: 'vuelos', catColor: '#0099cc', sub: 'SKY Airline' },
  { id: 'itau', name: 'Itaú Puntos', icon: 'account_balance', rate: 0.004, color: '#f59e0b', unit: 'pts', category: 'banco', catColor: '#f59e0b', sub: 'Banco Itaú Chile' },
  { id: 'bciplus', name: 'BciPlus+', icon: 'credit_score', rate: 0.01, color: '#a855f7', unit: 'pts', category: 'cashback', catColor: '#a855f7', sub: 'Banco BCI · MACH cashback' },
  { id: 'copec', name: 'Full Copec', icon: 'local_gas_station', rate: 0.01, color: '#f43f5e', unit: 'pts', category: 'combustible', catColor: '#f43f5e', sub: 'Copec · Tiendas Pronto' },
]
