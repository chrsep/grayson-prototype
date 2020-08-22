import { queryCache, useMutation } from "react-query"

const convertToMB = (size: number) => {
  return size / 1048576
}

const usePostImageToProduct = (productId: string) => {
  const postImageToProduct = (image: File) => {
    const fileSize = convertToMB(image.size)
    if (fileSize > 10) {
      // throw new Error("Ukuran maximum gambar adalah 10MB")
      throw new Error("Gambar ke-gedean, max 10MB")
    }
    const payload = new FormData()
    payload.append("image", image)

    return fetch(`/api/me/products/${productId}/images`, {
      credentials: "same-origin",
      method: "POST",
      body: payload,
    })
  }

  return useMutation(postImageToProduct, {
    onSuccess: async () => queryCache.invalidateQueries(["product", productId]),
  })
}

export default usePostImageToProduct
