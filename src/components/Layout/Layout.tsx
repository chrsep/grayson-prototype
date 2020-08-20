import React, { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Img from "react-optimized-image"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../Button/Button"
import BoxIcon from "../../icons/box.svg"
import ChevronLeftIcon from "../../icons/chevron-left.svg"
import { generateUrl } from "../../utils/cloudinary"

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
    <nav
      className="px-3 pt-3 flex items-center mx-auto max-w-4xl"
      style={{ height: 52 }}
    >
      {data && (
        <Link href="/profile">
          <div className="flex items-center fade-in cursor-pointer w-full">
            <img
              alt="profile-pic"
              src={generateUrl(data.picture, {
                width: 160,
                height: 160,
                fit: true,
              })}
              className="rounded flex-shrink-0 shadow-md object-cover"
              style={{ height: 36, width: 36 }}
            />
            <p className="ml-2 mr-3 w-3/5 truncate text-sm font-bold">{data?.name}</p>
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
              case "/products/edit":
                return "/products"
              default:
                return "/"
            }
          })()}
        >
          <Button outline className="ml-auto flex-shrink-0 pl-2">
            <Img src={ChevronLeftIcon} className="text-white mr-1" />
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
        <Img src={BoxIcon} className="text-white mr-2 transition-opacity" />
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
