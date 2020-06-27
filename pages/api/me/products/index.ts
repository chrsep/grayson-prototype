import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import auth0 from "../../../../utils/auth0"
import { queryProductsByUserId, upsertProduct } from "../../../../utils/mongodb"

export interface PostProductRequestBody {
  id?: string
  name: string
  price: number
  description: string
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
    const { id, name, price, description, images } = JSON.parse(
      req.body
    ) as PostProductRequestBody
    await upsertProduct(
      id ?? v4(),
      name,
      price,
      description,
      images ?? [],
      session.user.sub,
      session.user.name,
      session.user.picture
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
