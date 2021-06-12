import React, { FC, useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import isEmpty from "lodash/isEmpty"
import Head from "next/head"
import {
  findProductByUserSlug,
  queryAllProductSlugs,
  queryCompleteProductBySlug,
} from "../db"
import { generateUrl } from "../utils/cloudinary"
import Product from "../components/Product/Product"
import { formatPrice } from "../utils/formatter"
import Button from "../components/Button/Button"
import PlusIcon from "../icons/plus.svg"

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
      <Head>
        <title>{product?.name}</title>
      </Head>

      <div className="md:flex md:px-3 ">
        <div className="md:w-1/2">
          <ImagePreviews images={product.images} />
        </div>
        <div className="md:w-1/2 md:ml-3">
          <div className="m-3">
            <h1 className="font-bold text-2xl leading-tight">
              {product?.name}
            </h1>
            <h2 className="opacity-75 ml-auto">{formatPrice(product.price)}</h2>

            {product?.description && (
              <p className="mt-3 mb-6">{product.description}</p>
            )}

            <Button className="w-full mt-3 mb-6 py-4 font-bold rounded-lg">
              <PlusIcon className="mr-3" />
              Masukan ke Keranjang
            </Button>
          </div>
          <div className="flex items-start mb-3 px-3">
            <Image
              alt={product.user.name}
              className="rounded-lg"
              src={generateUrl(product.user.image, {})}
              width={80}
              height={80}
              objectFit="cover"
            />
            <div>
              <p className="my-1 ml-3 text-xl leading-tight font-bold">
                {product.user.name}
              </p>
              {product.user.address && (
                <p className="mb-2 ml-3 text-gray-700">
                  {product.user.address}
                </p>
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

      {!isEmpty(otherProducts) && (
        <>
          <div>
            <div className="mx-3 mt-6 font-bold">
              Lainnya oleh <span className="">{product.userName}</span>
            </div>
          </div>
          <div className="flex px-3 mt-2">
            {otherProducts.map(
              ({
                _id,
                name,
                price,
                images,
                userSlug,
                productSlug,
                category,
              }) => (
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
            )}
          </div>
        </>
      )}
    </main>
  )
}

const ImagePreviews: FC<{ images: string[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0])

  return (
    <>
      <div className="mt-3 fade-in">
        <div
          className="relative w-full overflow-hidden "
          style={{ paddingTop: "100%" }}
        >
          {selectedImage ? (
            <Image
              alt="gambar product"
              src={generateUrl(selectedImage, {})}
              className="absolute top-0 left-0 w-full h-full object-contain bg-black md:rounded-lg"
              layout="fill"
            />
          ) : (
            <Image
              alt="gambar product"
              src="/images/empty-image-placeholder.jpg"
              className="absolute top-0 w-full h-full object-cover md:rounded-lg"
              layout="fill"
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
}> = ({ url, selected, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    className="outline-none mr-2 flex-shrink-0"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter") onClick()
    }}
  >
    <Image
      alt="gambar product"
      src={generateUrl(url, { width: 80 })}
      className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg ${
        selected && "border-4"
      }`}
      width={60}
      height={50}
      placeholder="blur"
    />
  </div>
)

interface PageParams extends ParsedUrlQuery {
  slugs: string[]
}
export const getStaticProps: GetStaticProps<Props, PageParams> = async ({
  params,
}) => {
  if (params?.slugs === undefined) throw new Error("params is undefined")

  const [userSlug, productSlug] = params.slugs

  const product = await queryCompleteProductBySlug(userSlug, productSlug)
  if (!product) throw new Error("product not found")

  let otherProducts = await findProductByUserSlug(userSlug)
  otherProducts =
    otherProducts?.filter(
      (otherProduct) => otherProduct.productSlug !== productSlug
    ) ?? []

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
