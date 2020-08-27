import React, { FC } from "react"
import Link from "next/link"
import Img from "react-optimized-image"
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage"
import PlaceholderImage from "../../images/empty-image-placeholder.jpg"

const Product: FC<{
  id: string
  name: string
  price: number
  images: string[]
  userSlug: string
  productSlug: string
  userPhoto?: string
  userName?: string
  category?: number
  className?: string
}> = (
  {
    id,
    name,
    price,
    images,
    userName,
    userPhoto,
    userSlug,
    productSlug,
    className,
  },
  idx
) => (
  <div key={id} className={`${className} fade-in`}>
    <Link href="/[...slugs]" as={`/${userSlug}/${productSlug}`}>
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
              breakpoints={[
                { viewport: 200, imageWidth: 150 },
                { viewport: 400, imageWidth: 300 },
                { viewport: 640, imageWidth: 150 },
              ]}
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
          {userName && userPhoto && (
            <div className="flex">
              <CloudinaryImage
                alt={userName}
                className="rounded w-5 h-5 mr-1 object-cover"
                cloudinaryId={userPhoto}
                breakpoints={[{ imageWidth: 80, viewport: 200 }]}
                options={{ fill: true, crop: true, aspectRatio: 1 }}
              />
              <div className="text-sm text-gray-700 truncate pr-6">
                {userName}
              </div>
            </div>
          )}
        </div>
      </a>
    </Link>
  </div>
)

export default Product
