import React, { FC, useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Img from "react-optimized-image/lib"
import { queryAllProductSlugs, queryCompleteProductBySlug } from "../db"
import PlaceholderImage from "../images/empty-image-placeholder.jpg"
import { generateUrl } from "../utils/cloudinary"
import Button from "../components/Button/Button"

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
    user: Array<{
      _id: string
      email: string
      emailVerified: boolean
      name: string
      image: string
      slug: string
      whatsapp: string
      phone: string
      address?: string
    }>
  }
}
const ProductPage: FC<Props> = ({ product }) => {
  return (
    <main className="md:flex mx-auto max-w-4xl pb-8">
      {product ? (
        <>
          <div className="mx-3 my-8 md:hidden">
            <div className="flex">
              <h2 className="font-bold text-gray-700">{product?.userName}</h2>
              <h2 className="font-bold text-gray-700 ml-auto">
                {new Intl.NumberFormat("id", {
                  style: "currency",
                  currency: "IDR",
                }).format(product?.price ?? 0)}
              </h2>
            </div>
            <h1 className="text-4xl">{product?.name}</h1>
          </div>
          <div className="md:w-1/2">
            <ImagePreviews images={product.images} />
          </div>
          <div className="md:w-1/2 md:ml-3">
            <div className="flex flex-col md:block hidden md:my-8">
              <div className="flex mx-3">
                <h2 className="font-bold text-gray-700">{product?.userName}</h2>
                <h2 className="font-bold text-gray-700 ml-auto">
                  {new Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product?.price ?? 0)}
                </h2>
              </div>
              <h1 className="mx-3 font-bold text-4xl">{product?.name}</h1>
            </div>
            {product?.description && (
              <div className="px-3 py-8 border bg-white mb-6 md:rounded md:mb-3">
                <p className="font-bold text-gray-700 mb-3">{product?.name}</p>
                <p className="">{product?.description}</p>
              </div>
            )}
            <div className="px-3 py-8 border bg-white md:rounded">
              <div className="flex items-center mb-3">
                <img
                  alt={product.user?.[0].name}
                  className="rounded-lg w-20 h-20 object-cover"
                  src={generateUrl(product.user?.[0].image, {
                    width: 400,
                    fit: true,
                  })}
                />
                <div>
                  <p className="mb-1 ml-3 text-2xl leading-tight">
                    {product.user?.[0].name}
                  </p>
                  {product.user?.[0].address && (
                    <p className="ml-3 text-gray-700">
                      {product.user?.[0].address}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {product.user?.[0].whatsapp && (
                  <Button outline className="mr-2 w-full mb-3 flex-col py-3">
                    WhatsApp {product.user?.[0].whatsapp}
                  </Button>
                )}
                {product.user?.[0].phone && (
                  <Button outline className="mr-2 w-full mb-3 flex-col py-3">
                    Telfon/HP {product.user?.[0].phone}
                  </Button>
                )}
                {product.user?.[0].email && (
                  <Button outline className="mr-2 w-full mb-3 flex-col py-3">
                    Email {product.user?.[0].email}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="m-3">
          <div
            className="w-full relative overflow-hidden rounded-lg shadow bg-gray-200"
            style={{ paddingBottom: "75%" }}
          />
        </div>
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
          className="w-full relative overflow-hidden"
          style={{ paddingBottom: "100%" }}
        >
          {selectedImage ? (
            <img
              alt="gambar product"
              src={generateUrl(selectedImage, {})}
              className="absolute top-0 left-0 w-full h-full object-contain bg-black"
            />
          ) : (
            <Img
              webp
              url
              alt="gambar product"
              src={PlaceholderImage}
              className="absolute top-0 w-full h-full object-cover"
              sizes={[400, 500, 600]}
            />
          )}
        </div>
      </div>
      {images && (
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
      className="w-16 mr-2 outline-none"
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

export const getStaticProps: GetStaticProps<any, { slug: string[] }> = async ({
  params,
}) => {
  if (params?.slug === undefined) throw new Error("params is undefined")

  const product = await queryCompleteProductBySlug(
    params.slug[0],
    params.slug[1]
  )
  return {
    props: { product: product ?? [] },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await queryAllProductSlugs()
  // TODO: don't use as.
  const paths = products.map(({ productSlug, userSlug }) => ({
    params: { slug: [userSlug as string, productSlug as string] },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default ProductPage
