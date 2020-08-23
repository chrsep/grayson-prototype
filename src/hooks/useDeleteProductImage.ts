import { queryCache, useMutation } from "react-query"
import { deleteApi } from "../utils/api"

const useDeleteProductImage = (productId: string, cloudinaryId: string) => {
  const deleteImage = deleteApi(
    `/me/products/${productId}/images/${cloudinaryId}`
  )

  return useMutation(deleteImage, {
    onSuccess: async () => {
      await queryCache.invalidateQueries(["product", productId])
    },
  })
}

export default useDeleteProductImage
