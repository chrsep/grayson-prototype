import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import auth0 from "../../../../utils/auth0"
import { queryProductsByUserId, upsertProduct } from "../../../../db"

export interface PostProductRequestBody {
  id?: string
  name: string
  price: number
  description: string
  images: string[]
  category?: number
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  if (session) {
    const { id, name, price, description, images, category } = JSON.parse(
      req.body
    ) as PostProductRequestBody
    await upsertProduct(
      id ?? v4(),
      name,
      price,
      description,
      images ?? [],
      false,
      category,
      session.user.sub,
      session.user.name,
      session.user.picture
    )
    res.status(201).end()
  }
}

export interface GetMyProductsResponse {
  _id: string
  name: string
  price: number
  images: string[]
  hidden: boolean
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  if (session) {
    const products = await queryProductsByUserId(session.user.sub)
    res.json(products)
  }
}

export default auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      switch (req.method) {
        case "POST":
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
)
