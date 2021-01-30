import { useMutation, useQueryClient } from "react-query"
import { postApi } from "../utils/api"
import { PostProductRequestBody } from "../pages/api/me/products"

const usePostNewProduct = () => {
  const client = useQueryClient()
  const postProduct = postApi<PostProductRequestBody>("/me/products")

  return useMutation(postProduct, {
    onSuccess: () => client.invalidateQueries(["me", "products"]),
  })
}

export default usePostNewProduct
