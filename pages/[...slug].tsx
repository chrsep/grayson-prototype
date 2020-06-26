import { FC } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import {
  queryAllProductSlugs,
  queryCompleteProductBySlug,
} from "../utils/mongodb"

interface Props {}
const ProductPage: FC<Props> = () => {
  return (
    <main>
      <div>test</div>
    </main>
  )
}

export const getStaticProps: GetStaticProps<any, { slug: string[] }> = async ({
  params,
}) => {
  if (params?.slug === undefined) throw new Error("params is undefined")

  const product = await queryCompleteProductBySlug(
    params.slug[0],
    params.slug[1]
  )
  console.log(product)
  return {
    props: { product },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    unstable_revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await queryAllProductSlugs()
  const paths = products.map(({ productSlug, userSlug }) => ({
    params: { slug: [productSlug, userSlug] },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default ProductPage
