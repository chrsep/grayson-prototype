import { MongoClient } from "mongodb"
import { generateProductSlug, generateUserSlug } from "../utils/slug"

const MONGO_URL = process.env.MONGO_URL ?? ""

let cachedDb: MongoClient

const connectToDb = async () => {
  if (cachedDb && cachedDb.isConnected()) return cachedDb

  cachedDb = await MongoClient.connect(MONGO_URL, { ignoreUndefined: true })
  return cachedDb
}

const getUsersCollection = (client: MongoClient) => {
  return client.db("grayson").collection<User>("users")
}

const getProductsCollection = (client: MongoClient) => {
  return client.db("grayson").collection<Product>("products")
}

export const createUser = async (
  userId: string,
  email: string,
  name: string,
  image: string,
  emailVerified: boolean
) => {
  const client = await connectToDb()
  await getUsersCollection(client).updateOne(
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
      await getUsersCollection(client).updateOne(
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

      await getProductsCollection(client).updateMany(
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
  return getUsersCollection(client).findOne({ _id: userId })
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
  const user = await getUsersCollection(client).findOne({ _id: userId })

  let productSlug: string | undefined
  if (name) {
    productSlug = generateProductSlug(name)
  }
  await getProductsCollection(client).updateOne(
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
        userSlug: user?.slug ?? generateUserSlug(user?.name ?? userName ?? ""),
      },
    },
    { upsert: true }
  )
}

export const queryProducts = async (): Promise<Product[]> => {
  const client = await connectToDb()
  return getProductsCollection(client).find({ hidden: false }).toArray()
}

export const queryProductsByUserId = async (
  userId: string
): Promise<Product[]> => {
  const client = await connectToDb()
  return getProductsCollection(client).find({ userId }).toArray()
}

export const queryAllProductSlugs = async () => {
  const client = await connectToDb()
  return getProductsCollection(client)
    .find({}, { projection: { _id: 0, userSlug: 1, productSlug: 1 } })
    .toArray()
}

export const queryCompleteProductBySlug = async (
  userSlug: string,
  productSlug: string
) => {
  const client = await connectToDb()
  const fullProduct = await getProductsCollection(client).aggregate([
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
  return getProductsCollection(client).findOne({ _id })
}

export const deleteProductByIdAndUserId = async (_id: string, userId: any) => {
  const client = await connectToDb()
  return getProductsCollection(client).findOneAndDelete({ _id, userId })
}

export const addImageToProduct = async (_id: string, cloudinaryId: string) => {
  const client = await connectToDb()
  return getProductsCollection(client).updateOne(
    { _id },
    { $push: { images: cloudinaryId } }
  )
}

export const deleteImageById = async (_id: string, cloudinaryId: any) => {
  const client = await connectToDb()
  return getProductsCollection(client).updateOne(
    { _id },
    { $pull: { images: cloudinaryId } }
  )
}
