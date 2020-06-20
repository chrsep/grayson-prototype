import { NextApiHandler } from "next"
import { IncomingForm } from "formidable"
import { v2 } from "cloudinary"
import auth0 from "../../utils/auth0"

export interface PostImageResponse {
  id: string
}

const images: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0.getSession(req)
    // const uploadApiResponse = await cloudinary.v2.uploader.upload("filename", {
    // })
    if (session) {
      const form = new IncomingForm()
      form.parse(req, async (err, fields, files) => {
        const { image } = files
        const result = await v2.uploader.upload(image.path)

        res.json(JSON.stringify({ id: result.public_id, url: result.url }))
        res.status(201).end()
      })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default images
