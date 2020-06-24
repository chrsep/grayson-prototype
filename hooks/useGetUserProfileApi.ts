import { useQuery } from "react-query"
import { getApi } from "../utils/api"
import { GetProfileResponse } from "../pages/api/me/profile"

const useGetUserProfileApi = () => {
  const getProfile = getApi<GetProfileResponse>("/me/profile")

  return useQuery(["me", "profile"], getProfile, {
    retry: (failureCount, error) => {
      return error.message !== "not_authenticated"
    },
  })
}

export default useGetUserProfileApi
