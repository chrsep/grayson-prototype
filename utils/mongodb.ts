import { MongoClient } from "mongodb"

const CLIENT = new MongoClient(process.env.MONGODB_URL ?? "")

const getClient = async () => {
  if (!CLIENT.isConnected()) {
    await CLIENT.connect()
  }
  return CLIENT
}

interface UserSchema {
  _id: string
  email: string
  name: string
  image: string
  emailVerified: boolean
}

export const upsertUser = async (
  userId: string,
  email: string,
  name: string,
  image: string,
  emailVerified: boolean
) => {
  const client = await getClient()
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
  userId: string
  name: string
  price: number
  note: string
  images: string[]
}

export const upsertProduct = async (
  productId: string,
  userId: string,
  name: string,
  price: number,
  note: string,
  images: string[]
) => {
  const client = await getClient()
  await client
    .db("grayson")
    .collection<ProductSchema>("products")
    .updateOne(
      { _id: productId },
      { $set: { userId, name, price, note, images } },
      { upsert: true }
    )
}

export const queryProducts = async (): Promise<ProductSchema[]> => {
  const client = await getClient()
  const allProducts = client
    .db("grayson")
    .collection<ProductSchema>("products")
    .find()
  return allProducts.toArray()
}

export const queryProductsByUserId = async (
  userId: string
): Promise<ProductSchema[]> => {
  const client = await getClient()
  const allProducts = client
    .db("grayson")
    .collection<ProductSchema>("products")
    .find({ userId })
  return allProducts.toArray()
}
