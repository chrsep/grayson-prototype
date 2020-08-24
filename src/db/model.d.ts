interface User {
  _id: string
  email: string
  name: string
  image: string
  emailVerified: boolean
  phone: string
  whatsapp: string
  address: string
  slug: string
}

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images: string[]
  productSlug: string
  category: number
  // Denormalized user data
  userId: string
  userName: string
  userPhoto: string
  userSlug: string
}
