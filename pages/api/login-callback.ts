import auth0 from "../../utils/auth0"
import { upsertUser } from "../../utils/mongodb"

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req1, res1, session) => {
        await upsertUser(
          session.user.sub,
          session.user.email,
          session.user.name,
          session.user.picture,
          session.user.email_verified
        )
        return session
      },
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
