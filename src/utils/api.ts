const BASE_URL = "/api"

export const getApi = <T>(url: string) => async (): Promise<T> => {
  const result = await fetch(BASE_URL + url, {
    credentials: "same-origin",
  })

  const json = await result.json()
  if (!result.ok) {
    throw Error(json.error)
  }

  return json
}

export const deleteApi = (url: string) => async () => {
  const result = await fetch(`${BASE_URL}${url}`, {
    credentials: "same-origin",
    method: "DELETE",
  })

  if (!result.ok) {
    const body = await result.json()
    throw Error(body?.error ?? "")
  }

  return result
}

export const patchApi = <T>(url: string) => async (payload: T) => {
  const result = await fetch(`${BASE_URL}${url}`, {
    credentials: "same-origin",
    method: "PATCH",
    body: JSON.stringify(payload),
  })

  if (!result.ok) {
    const body = await result.json()
    throw Error(body?.error ?? "")
  }

  return result
}

export const postApi = <T>(url: string) => async (payload: T) => {
  const result = await fetch(`${BASE_URL}${url}`, {
    credentials: "same-origin",
    method: "POST",
    body: JSON.stringify(payload),
  })

  if (!result.ok) {
    const body = await result.json()
    throw Error(body?.error ?? "")
  }

  return result
}
