import { NextApiHandler } from "next"
import auth0 from "../../utils/auth0"

const logout: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleLogout(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

export default logout
