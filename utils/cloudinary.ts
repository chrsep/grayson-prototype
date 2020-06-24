type FULL_URL = string
type CLOUDINARY_ID = string

interface Options {
  width?: number
  height?: number
}
export const generateUrl = (
  image: FULL_URL | CLOUDINARY_ID,
  { width, height }: Options
) => {
  // In case image is already a full URL
  if (image.includes("https")) {
    return image
  }
  return `https://res.cloudinary.com/grayson/image/upload/${
    width ? `w_${width}/` : ""
  }${height ? `h_${height}/` : ""}${image}`
}
