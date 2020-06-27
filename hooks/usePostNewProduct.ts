import { queryCache, useMutation } from "react-query"
import { postApi } from "../utils/api"
import { PostProductRequestBody } from "../pages/api/me/products"

const usePostNewProduct = () => {
  const patchProduct = postApi<PostProductRequestBody>("/me/products")

  return useMutation(patchProduct, {
    onSuccess: () => queryCache.refetchQueries(["me", "products"]),
  })
}

export default usePostNewProduct
