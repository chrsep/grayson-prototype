import { useMutation } from "react-query"

const usePostProductImage = () => {
  const postImage = (image: File) => {
    const payload = new FormData()
    payload.append("image", image)

    return fetch(`/api/images`, {
      credentials: "same-origin",
      method: "POST",
      body: payload,
    })
  }

  return useMutation(postImage)
}

export default usePostProductImage
