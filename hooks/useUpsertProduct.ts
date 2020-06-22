import { useMutation } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProduct } from "../pages/api/products"

const useUpsertProduct = () => {
  const patchProduct = patchApi<PatchProduct>("/products")

  return useMutation(patchProduct)
}

export default useUpsertProduct
