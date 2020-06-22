import auth0 from "../../../utils/auth0"

export interface UserProfile {
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
    await auth0.handleProfile(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})
