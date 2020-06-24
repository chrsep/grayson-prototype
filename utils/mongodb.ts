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

interface UserSchema {
  _id: string
  email: string
  name: string
  image: string
  emailVerified: boolean
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
    .collection<UserSchema>("users")
    .updateOne(
      { _id: userId },
      {
        $setOnInsert: { email, name, picture: image },
        $set: { emailVerified },
      },
      { upsert: true }
    )
}

interface ProductSchema {
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
  productId: string,
  name: string,
  price: number,
  description: string,
  images: string[],
  userId: string,
  userName: string,
  userPhoto: string
) => {
  const client = await connectToDb()
  await client.db("grayson").collection<ProductSchema>("products").updateOne(
    { _id: productId },
    {
      $set: {
        userId,
        name,
        price,
        description,
        images,
        userPhoto,
        userName,
      },
    },
    { upsert: true }
  )
}

export const queryProducts = async (): Promise<ProductSchema[]> => {
  const client = await connectToDb()
  const allProducts = client
    .db("grayson")
    .collection<ProductSchema>("products")
    .find()
  return allProducts.toArray()
}

export const queryProductsByUserId = async (
  userId: string
): Promise<ProductSchema[]> => {
  const client = await connectToDb()
  const allProducts = client
    .db("grayson")
    .collection<ProductSchema>("products")
    .find({ userId })
  return allProducts.toArray()
}
