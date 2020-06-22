import { useQuery } from "react-query"
import { getApi } from "../utils/api"
import { UserProfile } from "../pages/api/me/profile"

const useGetUserProfileApi = () => {
  const getProfile = getApi<UserProfile>("/me/profile")

  return useQuery("profile", getProfile, {
    retry: (failureCount, error) => {
      return error.message !== "not_authenticated"
    },
  })
}

export default useGetUserProfileApi
