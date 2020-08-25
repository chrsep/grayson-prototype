import slugify from "slugify"
import { nanoid } from "nanoid"

export const generateUserSlug = (name: string) =>
  slugify(`${name}-${nanoid(3)}`, { lower: true })

export const generateProductSlug = (name: string) =>
  slugify(`${name}-${nanoid(3)}`, { lower: true })
