import { queryCache, useMutation } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProductRequestBody } from "../pages/api/me/products/[id]"

const usePatchProduct = (id: string) => {
  const patchProduct = patchApi<PatchProductRequestBody>(`/me/products/${id}`)

  return useMutation(patchProduct, {
    onSuccess: async () => {
      await Promise.all([
        queryCache.invalidateQueries(["me", "products"]),
        queryCache.invalidateQueries(["product", id]),
      ])
    },
  })
}

export default usePatchProduct
