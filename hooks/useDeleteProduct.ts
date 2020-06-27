import { queryCache, useMutation } from "react-query"
import { deleteApi } from "../utils/api"

const useDeleteProduct = (id: string) => {
  const patchProduct = deleteApi(`/me/products/${id}`)

  return useMutation(patchProduct, {
    onSuccess: () => queryCache.refetchQueries(["me", "products"]),
  })
}

export default useDeleteProduct
