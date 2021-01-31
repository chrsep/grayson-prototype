import { useMutation, useQueryClient } from "react-query"
import { patchApi } from "../utils/api"
import { PatchProfileRequestBody } from "../pages/api/me/profile"

const usePatchProfile = () => {
  const client = useQueryClient()
  const patchProfile = patchApi<PatchProfileRequestBody>("/me/profile")
  return useMutation(patchProfile, {
    onSuccess: () => client.refetchQueries(["me", "profile"]),
  })
}

export default usePatchProfile
