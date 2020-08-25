import { queryCache, useMutation } from "react-query"
import { postApi } from "../utils/api"
import { PostProductRequestBody } from "../pages/api/me/products"

const usePostNewProduct = () => {
  const postProduct = postApi<PostProductRequestBody>("/me/products")

  return useMutation(postProduct, {
    onSuccess: () => queryCache.invalidateQueries(["me", "products"]),
  })
}

export default usePostNewProduct
