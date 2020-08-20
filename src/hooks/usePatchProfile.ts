import { queryCache, useMutation } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProfileRequestBody } from "../pages/api/me/profile"

const usePatchProfile = () => {
  const patchProfile = patchApi<PatchProfileRequestBody>("/me/profile")
  return useMutation(patchProfile, {
    onSuccess: () => queryCache.invalidateQueries(["me", "profile"]),
  })
}

export default usePatchProfile
