import { useMutation, useQueryClient } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProductRequestBody } from "../pages/api/me/products/[productId]"

const usePatchProduct = (id: string) => {
  const client = useQueryClient()
  const patchProduct = patchApi<PatchProductRequestBody>(`/me/products/${id}`)

  return useMutation(patchProduct, {
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries(["me", "products"]),
        client.invalidateQueries(["product", id]),
      ])
    },
  })
}

export default usePatchProduct
