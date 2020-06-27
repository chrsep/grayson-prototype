import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../../utils/auth0"
import { queryProductById, upsertProduct } from "../../../../utils/mongodb"

export interface PatchProductRequestBody {
  id?: string
  name?: string
  price?: number
  description?: string
  images?: string[]
}

export interface GetProductDetailsResponse {
  id?: string
  name: string
  price: number
  description: string
  images: string[]
}

async function patchProductHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const session = await auth0.getSession(req)
  if (session) {
    const { name, price, description, images } = JSON.parse(
      req.body
    ) as PatchProductRequestBody
    await upsertProduct(id as string, name, price, description, images)
    res.status(201).end()
  }
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
    res.status(200).end()
  }
}

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        query: { id },
      } = req
      if (!id || Array.isArray(id)) {
        res.status(401).end()
        return
      }

      switch (req.method) {
        case "PATCH":
          await patchProductHandler(req, res, id)
          break
        case "GET":
          await getProductDetailHandler(req, res, id)
          break
        default:
      }
    } catch (error) {
      console.error(error)
      res.status(error.status || 400).end(error.message)
    }
  }
)