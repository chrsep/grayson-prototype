import Head from "next/head"
import React from "react"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"

const Home = () => {
  return (
    <>
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

export default Home
