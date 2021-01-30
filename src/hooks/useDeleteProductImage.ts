import { useMutation, useQueryClient } from "react-query"
import { deleteApi } from "../utils/api"

const useDeleteProductImage = (productId: string, cloudinaryId: string) => {
  const client = useQueryClient()
  const deleteImage = deleteApi(
    `/me/products/${productId}/images/${cloudinaryId}`
  )

  return useMutation(deleteImage, {
    onSuccess: async () => {
      await client.invalidateQueries(["product", productId])
    },
  })
}

export default useDeleteProductImage
