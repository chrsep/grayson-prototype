type FullUrl = string
type CloudinaryId = string

export interface CloudinaryOptions {
  width?: number
  height?: number
  scale?: boolean
  crop?: boolean
  face?: boolean
  fit?: boolean
  fill?: boolean
  fileType?: "jpg" | "webp"
  aspectRatio?: number
}
export const generateUrl = (
  image: FullUrl | CloudinaryId,
  {
    aspectRatio,
    width,
    height,
    scale,
    crop,
    face,
    fit,
    fill,
    fileType = "jpg",
  }: CloudinaryOptions
) => {
  // In case image is already a full URL
  if (image?.includes("https")) {
    return image
  }
  const configArray: string[] = []
  if (width) configArray.push(`w_${width}`)
  if (height) configArray.push(`h_${height}`)
  if (scale) configArray.push(`c_scale`)
  if (crop) configArray.push(`c_crop`)
  if (fit) configArray.push(`c_fit`)
  if (fill) configArray.push(`c_fill`)
  if (face) configArray.push(`g_face`)
  if (aspectRatio) configArray.push(`ar_${aspectRatio}`)

  return `https://res.cloudinary.com/grayson/image/upload/${configArray.join(
    ","
  )}/${image}.${fileType}`
}
