import { queryCache, useMutation } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProduct } from "../pages/api/me/products";

const useUpsertProduct = () => {
  const patchProduct = patchApi<PatchProduct>("/me/products")

  return useMutation(patchProduct, {
    onSuccess: () => queryCache.refetchQueries(["me", "products"]),
  })
}

export default useUpsertProduct
