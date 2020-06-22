import React, { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../Button/Button"
import BoxIcon from "../../icons/box.svg"
import ChevronLeftIcon from "../../icons/chevron-left.svg"

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

const Header = () => {
  const { data, status } = useGetUserProfileApi()
  const router = useRouter()

  return (
    <nav className="p-3 flex items-center mx-auto max-w-4xl h-16">
      {data && (
        <Link href="/profile">
          <div className="flex items-center fade-in cursor-pointer">
            <img
              alt="profile-pic"
              src={data?.picture}
              className="w-8 rounded flex-shrink-0 shadow-md"
            />
            <p className="ml-2 mr-3 w-3/5 truncate">{data?.name}</p>
          </div>
        </Link>
      )}
      {router.route === "/" ? (
        <IndexNavigation status={status} />
      ) : (
        <Link
          href={(() => {
            switch (router.route) {
              case "/products/new":
                return "/products"
              default:
                return "/"
            }
          })()}
        >
          <Button outline className="ml-auto flex-shrink-0 pl-2">
            <img
              alt="product icon"
              src={ChevronLeftIcon}
              className="text-white mr-1 h-full"
            />
            Kembali
          </Button>
        </Link>
      )}
    </nav>
  )
}

const IndexNavigation: FC<{ status: string }> = ({ status }) => {
  return status === "success" ? (
    <Link href="/products">
      <Button className="flex items-center ml-auto flex-shrink-0 fade-in">
        <img
          alt="product icon"
          src={BoxIcon}
          className="text-white mr-2 w-5 transition-opacity"
        />
        Produk-ku
      </Button>
    </Link>
  ) : (
    <Link href="/api/login">
      <Button outline={status === "loading"} className="ml-auto flex-shrink-0">
        Login
      </Button>
    </Link>
  )
}

export default Layout
