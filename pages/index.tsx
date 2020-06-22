import Head from "next/head"
import React, { FC, useState } from "react"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"
import { queryProducts } from "../utils/mongodb"
import { generateUrl } from "../utils/cloudinary"

interface Props {
  products: Array<{
    _id: string
    name: string
    price: number
    images: string[]
  }>
}

const Home: FC<Props> = ({ products }) => {
  const [search, setSearch] = useState("")

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
            <Input
              className="w-full"
              placeholder="Cari produk"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="flex ml-3 mt-3">
          {products
            .filter((product) => product.name.toLowerCase().includes(search))
            .map(({ _id, name, price, images }, idx) => {
              const productImage =
                (images?.length ?? 0) > 0
                  ? generateUrl(images[0], { width: 400 })
                  : ""
              return (
                <div
                  key={_id}
                  className="border w-1/2 sm:w-1/4 mr-3 mb-3 shadow-md bg-white rounded-md overflow-hidden"
                >
                  <div
                    className="w-full relative"
                    style={{ paddingBottom: "75%" }}
                  >
                    <img
                      alt={name}
                      src={productImage}
                      className="absolute top-0 w-full h-full fade-in"
                      loading={idx < 7 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="p-3">
                    <div>{name}</div>
                    <div className="text-sm text-gray-700">
                      {new Intl.NumberFormat("id", {
                        style: "currency",
                        currency: "IDR",
                      }).format(price)}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        {products.length === 0 && (
          <>
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
          </>
        )}
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const products: Props["products"] = await queryProducts()

  return {
    props: { products },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    unstable_revalidate: 1,
  }
}

export default Home
