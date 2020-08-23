import { useQuery } from "react-query"
import { getApi } from "../utils/api"
import { GetProductDetailsResponse } from "../pages/api/me/products/[productId]"

const useGetProductDetails = (id: string) => {
  const getMyProducts = getApi<GetProductDetailsResponse>(`/me/products/${id}`)

  return useQuery(["product", id], getMyProducts)
}

export default useGetProductDetails
