interface Options {
  width?: number
}
export const generateUrl = (id: string, { width }: Options) => {
  return `https://res.cloudinary.com/grayson/image/upload/${
    width ? `w_${width}/` : ""
  }${id}`
}
