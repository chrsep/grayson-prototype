import { ApiError } from "./useApi"

const BASE_URL = "/api"

export const getApi = <T>(url: string) => async (): Promise<T> => {
  const result = await fetch(BASE_URL + url, {
    credentials: "same-origin",
  })

  const json = await result.json()
  if (json.error) {
    throw Error(json.error.message)
  }

  return json
}

export const deleteApi = (url: string, id: string) => async () => {
  const result = await fetch(`${BASE_URL}${url}/${id}`, {
    credentials: "same-origin",
    method: "DELETE",
  })

  if (!result.ok) {
    const body: ApiError = await result.json()
    throw Error(body?.error?.message ?? "")
  }

  return result
}

export const patchApi = <T>(url: string, id: string) => async (payload: T) => {
  const result = await fetch(`${BASE_URL}${url}/${id}`, {
    credentials: "same-origin",
    method: "PATCH",
    body: JSON.stringify(payload),
  })

  if (!result.ok) {
    const body: ApiError = await result.json()
    throw Error(body?.error?.message ?? "")
  }

  return result
}

export const postApi = <T>(url: string, id: string) => async (payload: T) => {
  const result = await fetch(`${BASE_URL}${url}/${id}`, {
    credentials: "same-origin",
    method: "POST",
    body: JSON.stringify(payload),
  })

  if (!result.ok) {
    const body: ApiError = await result.json()
    throw Error(body?.error?.message ?? "")
  }

  return result
}
