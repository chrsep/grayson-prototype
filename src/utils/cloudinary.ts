type FullUrl = string
type CloudinaryId = string

interface Options {
  width?: number
  height?: number
  scale?: boolean
  crop?: boolean
  face?: boolean
  fit?: boolean
}
export const generateUrl = (
  image: FullUrl | CloudinaryId,
  { width, height, scale, crop, face, fit }: Options
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
  if (face) configArray.push(`g_face`)

  return `https://res.cloudinary.com/grayson/image/upload/${configArray.join(
    ","
  )}/${image}.jpg`
}
