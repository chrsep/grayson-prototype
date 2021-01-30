import { useMutation, UseMutationOptions } from "react-query"

const convertToMB = (size: number) => {
  return size / 1048576
}

const usePostImage = (options?: UseMutationOptions<any, any, any>) => {
  const postImage = (image: File) => {
    const fileSize = convertToMB(image.size)
    if (fileSize > 10) {
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

  return useMutation(postImage, options)
}

export default usePostImage
