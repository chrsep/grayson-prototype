export const Categories = ["makanan", "pakaian", "seni"] as const

export type Category = typeof Categories[number]

export const getCategoryName = (id: number): Category => {
  return Categories[id]
}
