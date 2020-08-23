import { NextApiRequest, NextApiResponse } from "next"
import { v2 } from "cloudinary"
import auth0 from "../../../../../../utils/auth0"
import { deleteImageById } from "../../../../../../db"

async function deleteImageHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  productId: string,
  imageId: string
) {
  const session = await auth0.getSession(req)
  if (session) {
    await v2.uploader.destroy(imageId)
    const { result } = await deleteImageById(productId, imageId)
    if (result.ok !== 1) {
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
        query: { productId, imageId },
      } = req
      if (!imageId || Array.isArray(imageId)) {
        res.status(401).end()
        return
      }
      if (!productId || Array.isArray(productId)) {
        res.status(401).end()
        return
      }

      switch (req.method) {
        case "DELETE":
          await deleteImageHandler(req, res, productId, imageId)
          break
        default:
      }
    } catch (error) {
      console.error(error)
      res.status(error.status || 400).end(error.message)
    }
  }
)
