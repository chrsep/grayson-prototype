import { useMutation, useQueryClient } from "react-query"
import { deleteApi } from "../utils/api"

const useDeleteProduct = (id: string) => {
  const client = useQueryClient()
  const patchProduct = deleteApi(`/me/products/${id}`)

  return useMutation(patchProduct, {
    onSuccess: () => client.invalidateQueries(["me", "products"]),
  })
}

export default useDeleteProduct
