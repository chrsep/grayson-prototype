import React, { FC } from "react"
import Button from "../Button/Button"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import BoxIcon from "../../icons/box.svg"

const Layout: FC = ({ children }) => {
  const { data, status } = useGetUserProfileApi()

  return (
    <div>
      <nav className="p-3 flex items-center mx-auto max-w-4xl">
        {status === "success" && (
          <>
            <img
              alt="profile-pic"
              src={data?.picture}
              className="w-8 rounded flex-shrink-0"
            />
            <p className="ml-3 mr-3 w-3/5 truncate">{data?.name}</p>
          </>
        )}
        {status !== "success" ? (
          <a href="/api/login" className="ml-auto flex-shrink-0">
            <Button>Login</Button>
          </a>
        ) : (
          <a href="/product" className="ml-auto  flex-shrink-0">
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
