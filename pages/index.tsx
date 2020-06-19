import Head from "next/head"
import React from "react"
import Link from "next/link"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"
import useGetUserProfileApi from "../hooks/useGetUserProfileApi"
import Button from "../components/Button/Button"
import BoxIcon from "../icons/box.svg"

const Home = () => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl">
        <Head>
          <title>Grayson</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="px-3">
          <label
            className="flex border rounded bg-white w-full block"
            aria-label="search"
          >
            <img
              alt="search icon"
              src={SearchIcon}
              className="m-3 flex-shrink-0"
            />
            <Input className="w-full" placeholder="Cari produk" />
          </label>
        </div>
        <picture>
          <source
            srcSet={require("../images/no-product.png?webp&width=672")}
            type="image/webp"
          />
          <source
            srcSet={require("../images/no-product.png?resize&size=672")}
            type="image/jpeg"
          />
          <img
            className="w-64 mx-auto mt-12"
            alt="No plans yet illustration"
            src={require("../images/no-product.png?resize&size=672")}
          />
        </picture>
        <h6 className="mt-8 text-center text-xl text-gray-900">
          Belum ada produk terdaftar
        </h6>
      </main>
    </>
  )
}

const Header = () => {
  const { data, status } = useGetUserProfileApi()

  return (
    <nav className="p-3 flex items-center mx-auto max-w-4xl">
      {data && (
        <>
          <img
            alt="profile-pic"
            src={data?.picture}
            className="w-8 rounded flex-shrink-0 shadow-md"
          />
          <p className="ml-2 mr-3 w-3/5 truncate">{data?.name}</p>
        </>
      )}
      {status !== "success" ? (
        <Link href="/api/login">
          <Button className="ml-auto flex-shrink-0">Login</Button>
        </Link>
      ) : (
        <Link href="/product">
          <Button className="flex items-center ml-auto flex-shrink-0">
            <img
              alt="product icon"
              src={BoxIcon}
              className="text-white mr-2 w-5"
            />
            Produk-ku
          </Button>
        </Link>
      )}
    </nav>
  )
}

export default Home
