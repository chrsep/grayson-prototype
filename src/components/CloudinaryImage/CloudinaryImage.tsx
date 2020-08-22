import React, { CSSProperties, FC } from "react"
import { CloudinaryOptions, generateUrl } from "../../utils/cloudinary"

interface Props {
  className: string
  alt: string
  cloudinaryId: string
  loading?: "eager" | "lazy"
  breakpoints?: Array<{ imageWidth: number; viewport: number }>
  options?: CloudinaryOptions
  style?: CSSProperties
  onClick?: () => void
}
const CloudinaryImage: FC<Props> = ({
  className,
  breakpoints = [],
  loading,
  alt,
  cloudinaryId,
  style,
  options = {},
  onClick,
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
      <source
        srcSet={generateUrl(cloudinaryId, { fileType: "webp", ...options })}
        type="image/webp"
      />
      <img
        alt={alt}
        src={generateUrl(cloudinaryId, options)}
        srcSet={srcSet}
        loading={loading}
        className={className}
        sizes="50vw"
        style={style}
        onClick={onClick}
      />
    </picture>
  )
}

export default CloudinaryImage
