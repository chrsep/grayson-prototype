import React, { FC } from "react"
import Button from "../Button/Button"

const Layout: FC = ({ children }) => {
  return (
    <div>
      <nav className="p-3 flex items-center mx-auto max-w-4xl">
        <div>Grayson</div>
        <a href="/api/login" className="ml-auto">
          <Button>Login</Button>
        </a>
      </nav>
      <main className="mx-auto max-w-4xl">{children}</main>
    </div>
  )
}

export default Layout
