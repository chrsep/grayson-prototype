import React, { FC, useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import {
  findProductByUserSlug,
  queryAllProductSlugs,
  queryCompleteProductBySlug,
} from "../db"
import { generateUrl } from "../utils/cloudinary"
import Product from "../components/Product/Product"

interface Props {
  product: {
    _id: string
    images: string[]
    name: string
    price: number
    productSlug: string
    userId: string
    userName: string
    userPhoto: string
    userSlug: string
    description: string
    user: {
      _id: string
      email: string
      emailVerified: boolean
      name: string
      image: string
      slug: string
      whatsapp: string
      phone: string
      address?: string
    }
  }
  otherProducts: Array<Product>
}
const ProductPage: FC<Props> = ({ product, otherProducts }) => {
  if (!product) {
    return (
      <main className="mx-auto max-w-4xl pb-8">
        <div className="m-3">
          <div
            className="w-full relative overflow-hidden rounded-lg shadow bg-gray-200"
            style={{ paddingBottom: "75%" }}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl pb-8">
      <div className="md:flex md:px-3 ">
        <div className="md:w-1/2">
          <ImagePreviews images={product.images} />
        </div>
        <div className="md:w-1/2 md:ml-3">
          <div className="m-3">
            <h1 className="font-bold text-2xl leading-tight">
              {product?.name}
            </h1>
            <h2 className="opacity-75 ml-auto">
              {new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
              }).format(product.price ?? 0)}
            </h2>
            {product?.description && (
              <p className="mt-3 mb-6">{product.description}</p>
            )}
          </div>
          <div className="flex items-center mb-3 px-3">
            <img
              alt={product.user.name}
              className="rounded-lg w-20 h-20 object-cover"
              src={generateUrl(product.user.image, {
                width: 400,
                fit: true,
              })}
            />
            <div>
              <p className="mb-1 ml-3 text-xl leading-tight font-bold">
                {product.user.name}
              </p>
              {product.user.address && (
                <p className="ml-3 text-gray-700">{product.user.address}</p>
              )}
              {product.user.whatsapp && (
                <div className="mx-3 mb-2 text-sm">
                  WhatsApp {product.user.whatsapp}
                </div>
              )}
              {product.user.phone && (
                <div className="mx-3 mb-2 text-sm">
                  Telfon {product.user.phone}
                </div>
              )}
              {product.user.email && (
                <div className="mx-3 mb-2 text-sm">
                  Email {product.user.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-3 mt-6 font-bold">
          Lainnya oleh <span className="">{product.userName}</span>
        </div>
      </div>
      <div className="flex px-3 mt-2">
        {otherProducts.map(
          ({ _id, name, price, images, userSlug, productSlug, category }) => {
            return (
              <Product
                key={_id}
                id={_id}
                name={name}
                price={price}
                images={images}
                productSlug={productSlug}
                userSlug={userSlug}
                category={category}
                className="w-1/2 sm:w-1/4 md:w-1/5 pr-2 mb-3 mb-6"
              />
            )
          }
        )}
      </div>
    </main>
  )
}

const ImagePreviews: FC<{ images: string[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0])

  return (
    <>
      <div className="mt-3 fade-in">
        <div
          className="w-full relative overflow-hidden"
          style={{ paddingBottom: "100%" }}
        >
          {selectedImage ? (
            <img
              alt="gambar product"
              src={generateUrl(selectedImage, {})}
              className="absolute top-0 left-0 w-full h-full object-contain bg-black md:rounded-lg"
            />
          ) : (
            <Image
              alt="gambar product"
              src="/images/empty-image-placeholder.jpg"
              className="absolute top-0 w-full h-full object-cover md:rounded-lg"
              height={400}
              width={500}
            />
          )}
        </div>
      </div>
      {images.length > 0 && (
        <div className="flex px-3 pb-3 pt-2 overflow-x-auto">
          {images.map((value) => (
            <ImageThumbnail
              key={value}
              url={value}
              selected={value === selectedImage}
              onClick={() => setSelectedImage(value)}
            />
          ))}
        </div>
      )}
    </>
  )
}

const ImageThumbnail: FC<{
  selected: boolean
  url: string
  onClick: () => void
}> = ({ url, selected, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="w-16 mr-2 outline-none flex-shrink-0"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick()
      }}
    >
      <div
        className={`w-full relative overflow-hidden rounded-lg ${
          selected && "shadow-outline"
        }`}
        style={{ paddingBottom: "75%" }}
      >
        <img
          alt="gambar product"
          src={generateUrl(url, { width: 80 })}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

interface PageParams extends ParsedUrlQuery {
  slugs: string[]
}
export const getStaticProps: GetStaticProps<Props, PageParams> = async ({
  params,
}) => {
  if (params?.slugs === undefined) throw new Error("params is undefined")

  const [userSlug, productSlug] = params.slugs

  const product = await queryCompleteProductBySlug(userSlug, productSlug)
  let otherProducts = await findProductByUserSlug(userSlug)

  if (!product) throw new Error("product not found")
  if (!otherProducts) otherProducts = []

  otherProducts = otherProducts.filter(
    (otherProduct) => otherProduct.productSlug === productSlug
  )

  return {
    props: {
      product,
      otherProducts,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const products = await queryAllProductSlugs()
  // TODO: don't use as.
  const paths = products.map(({ productSlug, userSlug }) => ({
    params: { slugs: [userSlug as string, productSlug as string] },
  }))

  return { paths, fallback: true }
}

export default ProductPage
