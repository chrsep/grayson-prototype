import React, { FC } from "react"
import { CloudinaryOptions, generateUrl } from "../../utils/cloudinary"

interface Props {
  className: string
  alt: string
  cloudinaryId: string
  loading?: "eager" | "lazy"
  breakpoints: { imageWidth: number; viewport: number }[]
  options?: CloudinaryOptions
}
const CloudinaryImage: FC<Props> = ({
  className,
  breakpoints,
  loading,
  alt,
  cloudinaryId,
  options = {},
}) => {
  const srcSet = breakpoints
    .map(
      ({ imageWidth, viewport }) =>
        `${generateUrl(cloudinaryId, {
          width: imageWidth,
          ...options,
        })} ${viewport}w`
    )
    .join(", ")

  const webpSrcSet = breakpoints
    .map(
      ({ imageWidth, viewport }) =>
        `${generateUrl(cloudinaryId, {
          width: imageWidth,
          fileType: "webp",
          ...options,
        })} ${viewport}w`
    )
    .join(", ")

  return (
    <picture>
      <source srcSet={webpSrcSet} type="image/webp" sizes="50vw" />
      <img
        alt={alt}
        src={generateUrl(cloudinaryId, {})}
        srcSet={srcSet}
        loading={loading}
        className={className}
        sizes="50vw"
      />
    </picture>
  )
}

export default CloudinaryImage