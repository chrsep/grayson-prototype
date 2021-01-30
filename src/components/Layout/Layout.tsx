import React, { FC } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../Button/Button"
import ChevronLeftIcon from "../../icons/chevron-left.svg"
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage"

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
            <div className="flex-shrink-0">
              <CloudinaryImage
                alt="profile-pic"
                cloudinaryId={data.picture}
                options={{ fill: true, crop: true, aspectRatio: 1 }}
                breakpoints={[{ imageWidth: 80, viewport: 200 }]}
                className="rounded-full object-cover block"
                style={{ height: 32, width: 32 }}
              />
            </div>
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
