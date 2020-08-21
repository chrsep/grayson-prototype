import React, { FC } from "react"
import { CloudinaryOptions, generateUrl } from "../../utils/cloudinary"

interface Props {
  className: string
  alt: string
  cloudinaryId: string
  loading?: "eager" | "lazy"
  sizes: number[]
  options?: CloudinaryOptions
}
const CloudinaryImage: FC<Props> = ({
  className,
  sizes,
  loading,
  alt,
  cloudinaryId,
  options = {},
}) => {
  const srcSet = sizes
    .map(
      (size) =>
        `${generateUrl(cloudinaryId, { width: size, ...options })} ${size}w`
    )
    .join(", ")

  const webpSrcSet = sizes
    .map(
      (size) =>
        `${generateUrl(cloudinaryId, {
          width: size,
          fileType: "webp",
          ...options,
        })} ${size}w`
    )
    .join(", ")

  return (
    <picture>
      <source srcSet={webpSrcSet} type="image/webp" />
      <img
        alt={alt}
        src={generateUrl(cloudinaryId, {})}
        srcSet={srcSet}
        loading={loading}
        className={className}
      />
    </picture>
  )
}

export default CloudinaryImage
