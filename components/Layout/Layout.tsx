import React, { FC } from "react"
import Button from "../Button/Button"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import BoxIcon from "../../icons/box.svg"

const Layout: FC = ({ children }) => {
  const { data, status } = useGetUserProfileApi()

  return (
    <div>
      <nav className="p-3 flex items-center mx-auto max-w-4xl">
        <img alt="profile-pic" src={data?.picture} className="w-8 rounded" />
        <div className="ml-3">{data?.name}</div>
        {status !== "success" ? (
          <a href="/api/login" className="ml-auto">
            <Button>Login</Button>
          </a>
        ) : (
          <a href="/product" className="ml-auto">
            <Button className="flex items-center">
              <img
                alt="product icon"
                src={BoxIcon}
                className="text-white mr-2 w-5"
              />
              Produk
            </Button>
          </a>
        )}
      </nav>
      <main className="mx-auto max-w-4xl">{children}</main>
    </div>
  )
}

export default Layout
