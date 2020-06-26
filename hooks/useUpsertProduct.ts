import { queryCache, useMutation } from "react-query"
import { patchApi } from "../utils/api"

interface PatchProduct {
  id?: string
  name: string
  price: number
  note: string
  images: string[]
}

const useUpsertProduct = () => {
  const patchProduct = patchApi<PatchProduct>("/me/products")

  return useMutation(patchProduct, {
    onSuccess: () => queryCache.refetchQueries(["me", "products"]),
  })
}

export default useUpsertProduct
