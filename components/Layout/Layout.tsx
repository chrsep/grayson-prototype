import { FC } from "react"
import Button from "../Button/Button"

const Layout: FC = ({ children }) => {
  return (
    <div>
      <nav className="p-3 flex items-center">
        <div>Grayson</div>
        <a href="/api/login" className="ml-auto">
          <Button>Login</Button>
        </a>
      </nav>
      {children}
    </div>
  )
}

export default Layout
