import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import auth0 from "../../../utils/auth0"
import { upsertProduct } from "../../../utils/mongodb"

export interface PatchProduct {
  id: string
  name: string
  price: number
  note: string
  images: string[]
}

async function postHandlers(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  const { id, name, price, note, images } = req.body as PatchProduct
  if (session) {
    await upsertProduct(id ?? v4(), session.user.sub, name, price, note, images)
    res.status(201).end()
  }
}

export default async function product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PATCH":
        await postHandlers(req, res)
        break
      default:
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
