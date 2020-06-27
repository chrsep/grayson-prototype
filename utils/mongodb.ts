import { MongoClient } from "mongodb"
import slugify from "slugify"
import { nanoid } from "nanoid"

const MONGO_URL = process.env.MONGO_URL ?? ""

let cachedDb: MongoClient

const connectToDb = async () => {
  if (cachedDb && cachedDb.isConnected()) {
    return cachedDb
  }

  cachedDb = await MongoClient.connect(MONGO_URL, { ignoreUndefined: true })
  return cachedDb
}

const generateUserSlug = (name: string) =>
  slugify(`${name}-${nanoid(3)}`, { lower: true })

const generateProductSlug = (name: string) =>
  slugify(`${name}-${nanoid(3)}`, { lower: true })

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
        $setOnInsert: {
          email,
          name,
          image,
          slug: generateUserSlug(name),
        },
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
  const session = await client.startSession()
  try {
    await session.withTransaction(async () => {
      let userSlug: string | undefined
      if (name) {
        userSlug = generateUserSlug(name)
      }
      await client
        .db("grayson")
        .collection<User>("users")
        .updateOne(
          { _id },
          {
            $set: {
              email,
              name,
              image,
              phone,
              whatsapp,
              address,
              slug: userSlug,
            },
          },
          { session }
        )
      if (!name && !image) return

      await client
        .db("grayson")
        .collection<Product>("products")
        .updateMany(
          { userId: _id },
          {
            $set: { userName: name, userPhoto: image, userSlug },
          },
          { session }
        )
    })
  } finally {
    await session.endSession()
  }
}

export const queryUserById = async (userId: string) => {
  const client = await connectToDb()
  return client.db("grayson").collection<User>("users").findOne({ _id: userId })
}

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images: string[]
  productSlug: string
  // Denormalized user data
  userId: string
  userName: string
  userPhoto: string
  userSlug: string
}
export const upsertProduct = async (
  _id: string,
  name?: string,
  price?: number,
  description?: string,
  images?: string[],
  hidden?: boolean,
  userId?: string,
  userName?: string,
  userPhoto?: string
) => {
  const client = await connectToDb()
  const user = await client
    .db("grayson")
    .collection<User>("users")
    .findOne({ _id: userId })

  let productSlug: string | undefined
  if (name) {
    productSlug = generateProductSlug(name)
  }
  await client
    .db("grayson")
    .collection<Product>("products")
    .updateOne(
      { _id },
      {
        $set: {
          name,
          price,
          description,
          images,
          productSlug,
          hidden,
        },
        $setOnInsert: {
          userId,
          userName: user?.name ?? userName,
          userPhoto: user?.image ?? userPhoto,
          userSlug:
            user?.slug ?? generateUserSlug(user?.name ?? userName ?? ""),
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
    .find({ hidden: false })
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

export const queryAllProductSlugs = async () => {
  const client = await connectToDb()
  const allProductIds = client
    .db("grayson")
    .collection<Product>("products")
    .find({}, { projection: { _id: 0, userSlug: 1, productSlug: 1 } })
  return allProductIds.toArray()
}

export const queryCompleteProductBySlug = async (
  userSlug: string,
  productSlug: string
) => {
  const client = await connectToDb()
  const fullProduct = await client
    .db("grayson")
    .collection("products")
    .aggregate([
      { $match: { userSlug, productSlug } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ])

  const hasNext = await fullProduct.hasNext()
  if (hasNext) {
    return fullProduct.next()
  }
  return undefined
}

export const queryProductById = async (_id: string) => {
  const client = await connectToDb()
  return client.db("grayson").collection("products").findOne({ _id })
}

export const deleteProductByIdAndUserId = async (_id: string, userId: any) => {
  const client = await connectToDb()
  return client
    .db("grayson")
    .collection("products")
    .findOneAndDelete({ _id, userId })
}
