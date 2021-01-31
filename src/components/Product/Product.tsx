import React, { FC } from "react"
import Link from "next/link"
import isEmpty from "lodash/isEmpty"
import Image from "next/image"
import { generateUrl } from "../../utils/cloudinary"
import { formatPrice } from "../../utils/formatter"

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
        {!isEmpty(images) ? (
          <Image
            alt={name}
            src={generateUrl(images[0], {})}
            loading={idx < 7 ? "eager" : "lazy"}
            width={300}
            height={200}
            className="rounded-lg"
            objectFit="cover"
          />
        ) : (
          <Image
            alt={name}
            src="/images/empty-image-placeholder.jpg"
            loading={idx < 7 ? "eager" : "lazy"}
            width={300}
            height={200}
            className="rounded-lg"
          />
        )}
        <div className="p-1">
          <div>{name}</div>
          <div className="text-gray-700 mb-1 text-sm">{formatPrice(price)}</div>
          {userName && userPhoto && (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  alt={userName}
                  className="rounded "
                  src={generateUrl(userPhoto, {})}
                  width={24}
                  height={24}
                  objectFit="cover"
                />
              </div>
              <div className="text-sm text-gray-700 truncate pr-6 ml-2 pb-1">
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
