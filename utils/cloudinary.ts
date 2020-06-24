type FULL_URL = string
type CLOUDINARY_ID = string

interface Options {
  width?: number
  height?: number
  scale?: boolean
}
export const generateUrl = (
  image: FULL_URL | CLOUDINARY_ID,
  { width, height, scale }: Options
) => {
  // In case image is already a full URL
  if (image.includes("https")) {
    return image
  }
  const configArray: string[] = []
  if (width) configArray.push(`w_${width}`)
  if (height) configArray.push(`w_${height}`)
  if (scale) configArray.push(`c_scale`)

  return `https://res.cloudinary.com/grayson/image/upload/${configArray.join(
    ","
  )}/${image}`
}
