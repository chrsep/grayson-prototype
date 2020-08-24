const category = ["makanan", "pakaian", "seni"] as const

export type Category = typeof category[number]

export const getCategoryName = (id: number): Category => {
  return category[id]
}
