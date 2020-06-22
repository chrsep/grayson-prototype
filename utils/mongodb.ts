import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URL ?? "")

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
  await client.connect()
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
  await client.close()
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
  await client.connect()
  await client
    .db("grayson")
    .collection<ProductSchema>("products")
    .updateOne(
      { _id: productId },
      { $set: { userId, name, price, note, images } },
      { upsert: true }
    )
  await client.close()
}

export const queryProducts = async (): Promise<ProductSchema[]> => {
  await client.connect()
  const allProducts = client
    .db("grayson")
    .collection<ProductSchema>("products")
    .find()
  return allProducts.toArray()
}
