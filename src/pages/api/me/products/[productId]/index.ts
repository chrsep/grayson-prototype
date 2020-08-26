import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../../../utils/auth0"
import {
  deleteProductByIdAndUserId,
  queryProductById,
  upsertProduct,
} from "../../../../../db"

export interface PatchProductRequestBody {
  id?: string
  name?: string
  price?: number
  description?: string
  images?: string[]
  hidden?: boolean
  category?: number
}

async function patchProductHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const session = await auth0.getSession(req)
  if (session) {
    const { name, price, description, images, hidden, category } = JSON.parse(
      req.body
    ) as PatchProductRequestBody
    await upsertProduct(
      id as string,
      name,
      price,
      description,
      images,
      hidden,
      category
    )
    res.status(201).end()
  }
}

export interface GetProductDetailsResponse {
  id?: string
  name: string
  price: number
  description: string
  images: string[]
  hidden: boolean
  category?: number
}

async function getProductDetailHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const session = await auth0.getSession(req)
  if (session) {
    const products = await queryProductById(id)
    res.json(products)
  }
}

async function deleteProductHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const session = await auth0.getSession(req)
  if (session) {
    const { ok } = await deleteProductByIdAndUserId(id, session.user.sub)
    if (ok !== 1) {
      res.status(404).end()
      return
    }
    res.status(200).end()
  }
}

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        query: { productId },
      } = req
      if (!productId || Array.isArray(productId)) {
        res.status(401).end()
        return
      }

      switch (req.method) {
        case "PATCH":
          await patchProductHandler(req, res, productId)
          break
        case "GET":
          await getProductDetailHandler(req, res, productId)
          break
        case "DELETE":
          await deleteProductHandler(req, res, productId)
          break
        default:
      }
    } catch (error) {
      console.error(error)
      res.status(error.status || 400).end(error.message)
    }
  }
)
