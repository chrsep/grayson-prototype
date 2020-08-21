import { NextApiHandler } from "next"
import auth0 from "../../utils/auth0"
import { createUser } from "../../db"

const callback: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req1, res1, session) => {
        await createUser(
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

export default callback