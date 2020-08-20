import { useMutation } from "react-query"

const convertToMB = (size: number) => {
  return size / 1048576
}

const usePostImage = () => {
  const postImage = (image: File) => {
    const fileSize = convertToMB(image.size)
    if (fileSize > 10) {
      // throw new Error("Ukuran maximum gambar adalah 10MB")
      throw new Error("Gambar ke-gedean, max 10MB")
    }
    const payload = new FormData()
    payload.append("image", image)

    return fetch(`/api/images`, {
      credentials: "same-origin",
      method: "POST",
      body: payload,
    })
  }

  return useMutation(postImage)
}

export default usePostImage
