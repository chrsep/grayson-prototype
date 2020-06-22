import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URL ?? "")

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
    .collection<{ a: string }>("users")
    .updateOne(
      { _id: userId },
      {
        $setOnInsert: { email, name, picture: image },
        $set: { emailVerified },
      },
      { upsert: true }
    )
}

export const upsertProduct = async (
  userId: string,
  name: string,
  price: number,
  note: string,
  images: string[],
  productId?: string
) => {
  await client.connect()
  await client
    .db("grayson")
    .collection<{ a: string }>("users")
    .updateOne(
      { _id: productId },
      { $set: { userId, name, price, note, images } },
      { upsert: true }
    )
}
