import { MongoClient } from "mongodb"

const MONGO_URL = process.env.MONGO_URL ?? ""

let cachedDb: MongoClient

const connectToDb = async () => {
  if (cachedDb && cachedDb.isConnected()) {
    return cachedDb
  }

  cachedDb = await MongoClient.connect(MONGO_URL)
  return cachedDb
}

interface User {
  _id: string
  email: string
  name: string
  image: string
  emailVerified: boolean
  phone: string
  whatsapp: string
  address: string
}
export const createUser = async (
  userId: string,
  email: string,
  name: string,
  image: string,
  emailVerified: boolean
) => {
  const client = await connectToDb()
  await client
    .db("grayson")
    .collection<User>("users")
    .updateOne(
      { _id: userId },
      {
        $setOnInsert: { email, name, picture: image },
        $set: { emailVerified },
      },
      { upsert: true }
    )
}

export const updateUser = async (
  _id: string,
  email?: string,
  name?: string,
  image?: string,
  phone?: string,
  whatsapp?: string,
  address?: string
) => {
  const client = await connectToDb()
  await client.db("grayson").collection<User>("users").updateOne(
    { _id },
    {
      $set: { email, name, image, phone, whatsapp, address },
    }
  )
}

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images: string[]
  // Denormalized user data
  userId: string
  userName: string
  userPhoto: string
}

export const upsertProduct = async (
  _id: string,
  name?: string,
  price?: number,
  description?: string,
  images?: string[],
  userId?: string,
  userName?: string,
  userPhoto?: string
) => {
  const client = await connectToDb()
  await client.db("grayson").collection<Product>("products").updateOne(
    { _id },
    {
      $set: {
        name,
        price,
        description,
        images,
        userId,
        userName,
        userPhoto,
      },
    },
    { upsert: true }
  )
}

export const queryProducts = async (): Promise<Product[]> => {
  const client = await connectToDb()
  const allProducts = client
    .db("grayson")
    .collection<Product>("products")
    .find()
  return allProducts.toArray()
}

export const queryProductsByUserId = async (
  userId: string
): Promise<Product[]> => {
  const client = await connectToDb()
  const allProducts = client
    .db("grayson")
    .collection<Product>("products")
    .find({ userId })
  return allProducts.toArray()
}
