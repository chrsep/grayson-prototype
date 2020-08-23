import { useMutation } from "react-query"
import { deleteApi } from "../utils/api"

const useDeleteImage = (cloudinaryId: string) => {
  const deleteImage = deleteApi(`/images/${cloudinaryId}`)

  return useMutation(deleteImage)
}

export default useDeleteImage
