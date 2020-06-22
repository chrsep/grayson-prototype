import { NextApiRequest, NextApiResponse } from "next"
import { queryProducts } from "../../../utils/mongodb"

export interface PatchProduct {
  id?: string
  name: string
  price: number
  note: string
  images: string[]
}

async function getProductsHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = queryProducts()
    res.json(products)
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

export default async function product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PATCH":
        await getProductsHandler(req, res)
        break
      default:
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
