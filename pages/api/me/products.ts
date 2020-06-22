import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import auth0 from "../../../utils/auth0"
import { queryProductsByUserId, upsertProduct } from "../../../utils/mongodb"

export interface PatchProduct {
  id?: string
  name: string
  price: number
  note: string
  images: string[]
}

export interface GetMyProductsResponse {
  _id: string
  name: string
  price: number
  images: string[]
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  if (session) {
    const { id, name, price, note, images } = JSON.parse(
      req.body
    ) as PatchProduct
    await upsertProduct(
      id ?? v4(),
      session.user.sub,
      name,
      price,
      note,
      images ?? []
    )
    res.status(201).end()
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  if (session) {
    const products = await queryProductsByUserId(session.user.sub)
    res.json(products)
    res.status(200).end()
  }
}

export default async function product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PATCH":
        await postHandler(req, res)
        break
      case "GET":
        await getHandler(req, res)
        break
      default:
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
