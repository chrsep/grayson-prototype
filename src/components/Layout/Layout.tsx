import React, { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../Button/Button"
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
      style={{ height: 60 }}
    >
      {router.route === "/" ? (
        <div />
      ) : (
        <Link
          href={(() => {
            switch (router.route) {
              case "/products/new":
                return "/products"
              case "/products/edit":
                return "/products"
              case "/profile":
                return "/products"
              default:
                return "/"
            }
          })()}
        >
          <Button outline className="flex-shrink-0 pl-2">
            <ChevronLeftIcon className="text-white mr-1" />
            Kembali
          </Button>
        </Link>
      )}
      {data ? (
        <Link href="/products">
          <div className="flex items-center fade-in cursor-pointer border rounded-full p-1 ml-auto bg-surface">
            <Image
              alt="profile-pic"
              src={generateUrl(data.picture, {})}
              height={32}
              width={32}
              className="rounded-full"
            />
            <p className="ml-2 mr-3 w-3/5 truncate text-sm font-bold block">
              {data?.name}
            </p>
          </div>
        </Link>
      ) : (
        <Link href="/api/login">
          <Button
            outline={status === "loading"}
            className="ml-auto flex-shrink-0"
          >
            Login
          </Button>
        </Link>
      )}
    </nav>
  )
}

export default Layout
