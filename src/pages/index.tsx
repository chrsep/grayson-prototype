import Head from "next/head"
import React, { FC, useState } from "react"
import Img from "react-optimized-image"
import Link from "next/link"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"
import { queryProducts } from "../db"
import { generateUrl } from "../utils/cloudinary"
import PlaceholderImage from "../images/empty-image-placeholder.jpg"
import NoProductImage from "../images/no-product.png"
import CloudinaryImage from "../components/CloudinaryImage/CloudinaryImage"

interface Props {
  products: Array<{
    _id: string
    name: string
    price: number
    images: string[]
    userPhoto: string
    userName: string
    userSlug: string
    productSlug: string
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
            <Img src={SearchIcon} className="m-3 mr-1 flex-shrink-0" />
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
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(
              ({
                _id,
                name,
                price,
                images,
                userName,
                userPhoto,
                userSlug,
                productSlug,
              }) => {
                return (
                  <Product
                    key={_id}
                    id={_id}
                    name={name}
                    price={price}
                    images={images}
                    userName={userName}
                    userPhoto={userPhoto}
                    productSlug={productSlug}
                    userSlug={userSlug}
                  />
                )
              }
            )}
        </div>
        {products.length === 0 && (
          <>
            <Img
              className="w-64 mx-auto mt-12"
              src={NoProductImage}
              webp
              sizes={[250, 300, 672]}
            />
            <h6 className="mt-8 text-center text-xl text-gray-900">
              Belum ada produk terdaftar
            </h6>
          </>
        )}
      </main>
    </>
  )
}

const Product: FC<{
  id: string
  name: string
  price: number
  images: string[]
  userPhoto: string
  userName: string
  userSlug: string
  productSlug: string
}> = (
  { id, name, price, images, userName, userPhoto, userSlug, productSlug },
  idx
) => {
  return (
    <div key={id} className="w-1/2 sm:w-1/4 md:w-1/5 pr-2 mb-3 mb-6 fade-in">
      <Link href={`/${userSlug}/${productSlug}`}>
        <a className="block">
          <div
            className="w-full relative overflow-hidden rounded-lg"
            style={{ paddingBottom: "75%" }}
          >
            {(images?.length ?? 0) > 0 ? (
              <CloudinaryImage
                alt={name}
                cloudinaryId={images[0]}
                className="absolute top-0 w-full h-full object-cover"
                loading={idx < 7 ? "eager" : "lazy"}
                sizes={[150, 200, 250]}
                options={{ fill: true, crop: true, aspectRatio: 1.3 }}
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
            <div className="text-gray-700 mb-1 text-sm">
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
                  fit: true,
                })}
              />
              <div className="text-sm text-gray-700 truncate pr-6">
                {userName}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export const getStaticProps = async () => {
  const products: Props["products"] = await queryProducts()

  return {
    props: { products },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1,
  }
}

export default Home
