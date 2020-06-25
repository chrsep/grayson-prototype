import Head from "next/head"
import React, { FC, useState } from "react"
import Img, { Svg } from "react-optimized-image"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"
import { queryProducts } from "../utils/mongodb"
import { generateUrl } from "../utils/cloudinary"
import PlaceholderImage from "../images/empty-image-placeholder.jpg"

interface Props {
  products: Array<{
    _id: string
    name: string
    price: number
    images: string[]
    userPhoto: string
    userName: string
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
        <div className="mx-3 sticky top-0 pt-3 z-10 bg-gray-100 rounded-b-lg ">
          <label
            className="flex bg-white w-full block rounded-lg shadow focus-within:shadow-outline"
            aria-label="search"
          >
            <Svg src={SearchIcon} className="m-3 mr-1 flex-shrink-0" />
            <Input
              className="w-full outline-none rounded-lg"
              placeholder="Cari"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="flex ml-3 mr-1 mt-3 flex-wrap">
          {products
            .filter((product) => product.name.toLowerCase().includes(search))
            .map(({ _id, name, price, images, userName, userPhoto }, idx) => (
              <div key={_id} className="w-1/2 sm:w-1/4 md:w-1/5 pr-2 mb-3">
                <div
                  className="w-full relative overflow-hidden rounded-lg shadow"
                  style={{ paddingBottom: "75%" }}
                >
                  {(images?.length ?? 0) > 0 ? (
                    <img
                      alt={name}
                      src={generateUrl(images[0], { width: 400 })}
                      className="absolute top-0 w-full h-full object-cover"
                      loading={idx < 7 ? "eager" : "lazy"}
                    />
                  ) : (
                    <Img
                      webp
                      url
                      alt={name}
                      src={PlaceholderImage}
                      className="absolute top-0 w-full h-full object-cover"
                      loading={idx < 7 ? "eager" : "lazy"}
                      sizes={[160, 250, 300]}
                    />
                  )}
                </div>
                <div className="p-1">
                  <div>{name}</div>
                  <div className="text-sm text-gray-700 mb-1">
                    {new Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                    }).format(price)}
                  </div>
                  <div className="flex">
                    <img
                      alt={userName}
                      className="rounded w-5 h-5 mr-1 object-cover"
                      src={generateUrl(userPhoto, {
                        width: 40,
                        height: 40,
                        scale: true,
                      })}
                    />
                    <div className="text-sm text-gray-700">{userName}</div>
                  </div>
                </div>
              </div>
            ))}
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
                loading="lazy"
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
