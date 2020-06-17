import React, { FC } from "react"
import Button from "../Button/Button"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"

const Layout: FC = ({ children }) => {
  const { data, error, status } = useGetUserProfileApi()

  return (
    <div>
      <nav className="p-3 flex items-center mx-auto max-w-4xl">
        <div>Grayson</div>
        {status !== "success" && (
          <a href="/api/login" className="ml-auto">
            <Button>Login</Button>
          </a>
        )}
      </nav>
      <main className="mx-auto max-w-4xl">{children}</main>
    </div>
  )
}

export default Layout
