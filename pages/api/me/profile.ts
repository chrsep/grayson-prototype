import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../utils/auth0"
import { updateUser } from "../../../utils/mongodb"

interface PatchProfileRequestBody {
  email?: string
  name?: string
  image?: string
  phone?: string
  whatsapp?: string
  address?: string
}
async function handlePatchProfile(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  if (session) {
    const body: PatchProfileRequestBody = JSON.parse(req.body)
    await updateUser(
      session.user.sub,
      body.email,
      body.name,
      body.image,
      body.phone,
      body.whatsapp,
      body.address
    )
    res.status(201).end()
  }
}

export interface GetProfileResponse {
  family_name: string
  given_name: string
  locale: string
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
  phone?: string
  address?: string
}
export default auth0.requireAuthentication(async function me(req, res) {
  try {
    switch (req.method) {
      case "GET":
        await auth0.handleProfile(req, res)
        break
      case "PATCH":
        await handlePatchProfile(req, res)
        break
      default:
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})
