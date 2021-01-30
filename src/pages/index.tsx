import Head from "next/head"
import React, { FC, useState } from "react"
import Image from "next/image"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"
import { queryProducts } from "../db"
import { Categories } from "../utils/categories"
import Chip from "../components/Chip/Chip"
import Product from "../components/Product/Product"

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
    category?: number
  }>
}
const Home: FC<Props> = ({ products }) => {
  const [search, setSearch] = useState("")
  const [filteredCategory, setFilteredCategory] = useState<number>()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (filteredCategory === undefined || product.category === filteredCategory)
  )

  return (
    <>
      <main className="mx-auto max-w-4xl">
        <Head>
          <title>Grayson</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="mx-3 sticky top-0 pt-3 z-10 bg-background rounded-b-lg ">
          <label
            className="flex bg-white w-full block rounded-lg shadow focus-within:shadow-outline border overflow-hidden"
            aria-label="search"
          >
            <SearchIcon className="m-3 mr-1 flex-shrink-0 text-gray-600" />
            <Input
              className="w-full outline-none rounded-lg"
              placeholder="Cari"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
        <div className="flex mx-3 mt-2 flex-wrap">
          <Chip
            text="Semua"
            className="mr-2 mb-2"
            selected={filteredCategory === undefined}
            onClick={() => setFilteredCategory(undefined)}
          />
          {Categories.map((category, idx) => (
            <Chip
              text={category}
              className="mr-2 mb-2 capitalize"
              onClick={() => setFilteredCategory(idx)}
              selected={filteredCategory === idx}
            />
          ))}
        </div>
        <div className="flex ml-3 mr-1 flex-wrap">
          {filteredProducts.map(
            ({
              _id,
              name,
              price,
              images,
              userName,
              userPhoto,
              userSlug,
              productSlug,
              category,
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
                  category={category}
                  className="w-1/2 sm:w-1/4 md:w-1/5 pr-2 mb-3 mb-6"
                />
              )
            }
          )}
        </div>
        {filteredProducts.length === 0 && (
          <>
            <Image
              className="w-64 mx-auto mt-12"
              src="/images/no-product.png"
              width={300}
              height={300}
            />
            <h6 className="mt-8 text-center text-xl text-gray-900 px-3">
              Belum ada produk
              {filteredCategory !== undefined &&
                ` ${Categories[filteredCategory]} `}
              terdaftar
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
    revalidate: 1,
  }
}

export default Home
