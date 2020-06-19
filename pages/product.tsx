import React from "react"
import useGetUserProfileApi from "../hooks/useGetUserProfileApi"
import Button from "../components/Button/Button"
import ChevronLeftIcon from "../icons/chevron-left.svg"

const ProductPage = () => (
  <>
    <Header />
    <main className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold mx-3">Produk-ku</h1>
      <picture>
        <source
          srcSet={require("../images/you-no-product.png?webp&resize&size=256")}
          type="image/webp"
        />
        <source
          srcSet={require("../images/you-no-product.png?resize&size=256")}
          type="image/jpeg"
        />
        <img
          className="w-64 mx-auto mt-12"
          alt="No plans yet illustration"
          src={require("../images/you-no-product.png?resize&size=256")}
        />
      </picture>
      <h6 className="mt-8 text-center text-xl text-gray-900">
        Anda belum menambahkan produk
      </h6>
    </main>
  </>
)

const Header = () => {
  const { data, status } = useGetUserProfileApi()

  return (
    <nav className="p-3 flex items-center mx-auto max-w-4xl">
      {status === "success" && (
        <>
          <img
            alt="profile-pic"
            src={data?.picture}
            className="w-8 rounded flex-shrink-0 shadow"
          />
          <p className="ml-2 mr-3 w-3/5 truncate">{data?.name}</p>
        </>
      )}
      <a href="/" className="ml-auto  flex-shrink-0">
        <Button className="flex items-center pl-2 rounded bg-transparent text-black border shadow-none">
          <img
            alt="product icon"
            src={ChevronLeftIcon}
            className="text-white mr-1 w-5"
          />
          Kembali
        </Button>
      </a>
    </nav>
  )
}

export default ProductPage
