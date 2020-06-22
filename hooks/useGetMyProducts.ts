import { useQuery } from "react-query"
import { getApi } from "../utils/api"
import { GetMyProductsResponse } from "../pages/api/me/products"

const useGetMyProducts = () => {
  const getMyProducts = getApi<GetMyProductsResponse[]>("/me/products")

  return useQuery(["me", "products"], getMyProducts)
}

export default useGetMyProducts
