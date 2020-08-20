import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../utils/auth0"
import { queryUserById, updateUser } from "../../../db"

export interface PatchProfileRequestBody {
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
  name: string
  picture: string
  phone?: string
  address?: string
  whatsapp?: string
}

async function handleGetProfile(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth0.getSession(req)
  if (session) {
    const user = await queryUserById(session.user.sub)
    const response: GetProfileResponse = {
      name: user?.name ?? session.user.name,
      picture: user?.image ?? session.user.picture,
      phone: user?.phone,
      address: user?.address,
      whatsapp: user?.whatsapp,
    }
    res.json(response)
  }
}

export default auth0.requireAuthentication(async function me(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        await handleGetProfile(req, res)
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
