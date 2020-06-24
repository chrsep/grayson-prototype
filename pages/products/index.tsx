import React, { FC } from "react"
import Link from "next/link"
import PlusIcon from "../../icons/plus.svg"
import useGetMyProducts from "../../hooks/useGetMyProducts"
import { generateUrl } from "../../utils/cloudinary"

const ProductPage = () => {
  const { data, status } = useGetMyProducts()

  return (
    <>
      <main className="mx-auto max-w-4xl">
        <div className="flex items-end">
          <h1 className="text-3xl font-bold mx-3">Produk-ku</h1>
          <Link href="/products/new">
            <button className="bg-black rounded-full py-3 pl-3 pr-6 shadow absolute right-0 bottom-0 m-3 z-50 text-white flex items-center md:relative md:ml-auto text-sm">
              <img alt="Produk baru" src={PlusIcon} className="mr-2" />
              Tambah Produk
            </button>
          </Link>
        </div>
        {status === "loading" && (
          <>
            <LoadingPlaceholder />
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </>
        )}
        {data?.map(({ _id, name, images, price }) => {
          const productImage =
            (images?.length ?? 0) > 0
              ? generateUrl(images[0], { width: 80 })
              : require("../../images/empty-image-placeholder.jpg?webp&width=80")
          return (
            <div className="flex m-3 items-center fade-in" key={_id}>
              <img
                alt={name}
                src={productImage}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="ml-3">
                <div>{name}</div>
                <div className="text-gray-700 text-sm">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                  }).format(price)}
                </div>
              </div>
            </div>
          )
        })}
        {data?.length === 0 && (
          <>
            <picture>
              <source
                srcSet={require("../../images/you-no-product.png?webp&width=672")}
                type="image/webp"
              />
              <source
                srcSet={require("../../images/you-no-product.png?resize&size=672")}
                type="image/jpeg"
              />
              <img
                className="w-64 mx-auto mt-12"
                alt="No plans yet illustration"
                src={require("../../images/you-no-product.png?resize&size=672")}
              />
            </picture>
            <h6 className="mt-8 text-center text-xl text-gray-900">
              Anda belum menambahkan produk
            </h6>
          </>
        )}
      </main>
    </>
  )
}

const LoadingPlaceholder: FC = () => {
  return (
    <div className="m-3 flex items-center">
      <div className="h-12 w-12 rounded bg-gray-300" />
      <div className="ml-3 flex flex-col items-start">
        <div className="mb-1 h-4 w-32 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  )
}

export default ProductPage
