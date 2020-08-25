export const Categories = ["makanan", "pakaian", "seni"] as const

export type Category = typeof Categories[number]
