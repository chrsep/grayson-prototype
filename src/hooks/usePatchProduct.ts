import { queryCache, useMutation } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProductRequestBody } from "../pages/api/me/products/[id]"

const usePatchProduct = (id: string) => {
  const patchProduct = patchApi<PatchProductRequestBody>(`/me/products/${id}`)

  return useMutation(patchProduct, {
    onSuccess: async () => {
      await Promise.all([
        queryCache.refetchQueries(["me", "products"]),
        queryCache.refetchQueries(["product", id]),
      ])
    },
  })
}

export default usePatchProduct
