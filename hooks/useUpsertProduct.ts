import { useMutation } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProduct } from "../pages/api/products"

const useUpsertProduct = () => {
  const patchProduct = patchApi<PatchProduct>("/me/products")

  return useMutation(patchProduct)
}

export default useUpsertProduct
