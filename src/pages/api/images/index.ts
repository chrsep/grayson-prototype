import { NextApiHandler, NextApiRequest } from "next"
import { IncomingForm, File } from "formidable-serverless"
import { v2 } from "cloudinary"
import auth0 from "../../../utils/auth0"

export interface PostImageResponse {
  id: string
}

const parseForm = (req: NextApiRequest) => {
  return new Promise<File>((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err)
      resolve(files.image)
    })
  })
}

const index: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0.getSession(req)
    if (session) {
      const image = await parseForm(req)
      const result = await v2.uploader.upload(image.path)

      res.json(JSON.stringify({ id: result.public_id, url: result.url }))
      res.status(201).end()
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

export default index
