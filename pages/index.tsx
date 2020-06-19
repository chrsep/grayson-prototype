import Head from "next/head"
import React from "react"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"

const Home = () => {
  return (
    <>
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
          <Input className="w-full" />
        </label>
      </div>
      <picture>
        <source
          srcSet={require("../images/no-product.png?webp")}
          type="image/webp"
        />
        <source
          srcSet={require("../images/no-product.png")}
          type="image/jpeg"
        />
        <img
          className="w-64 mx-auto mt-12"
          alt="No plans yet illustration"
          src={require("../images/no-product.png")}
        />
      </picture>
      <h6 className="mt-8 text-center text-xl">Belum ada produk terdaftar</h6>
    </>
  )
}

export default Home
