import React from "react"
import Link from "next/link"
import useGetUserProfileApi from "../hooks/useGetUserProfileApi"
import Button from "../components/Button/Button"
import ChevronLeftIcon from "../icons/chevron-left.svg"
import PlusIcon from "../icons/plus.svg"

const ProductPage = () => (
  <>
    <Header />
    <main className="mx-auto max-w-4xl">
      <div className="flex">
        <h1 className="text-4xl font-bold mx-3">Produk-ku</h1>
        <Link href="/product/new">
          <button className="bg-black rounded-full py-3 pl-3 pr-6 shadow absolute right-0 bottom-0 m-3 z-50 text-white flex items-center md:relative md:ml-auto text-sm">
            <img alt="Produk baru" src={PlusIcon} className="mr-2" />
            Tambah Produk
          </button>
        </Link>
      </div>
      <picture>
        <source
          srcSet={require("../images/you-no-product.png?webp&width=672")}
          type="image/webp"
        />
        <source
          srcSet={require("../images/you-no-product.png?resize&size=672")}
          type="image/jpeg"
        />
        <img
          className="w-64 mx-auto mt-12"
          alt="No plans yet illustration"
          src={require("../images/you-no-product.png?resize&size=672")}
        />
      </picture>
      <h6 className="mt-8 text-center text-xl text-gray-900">
        Anda belum menambahkan produk
      </h6>
    </main>
  </>
)

const Header = () => {
  const { data } = useGetUserProfileApi()

  return (
    <nav className="p-3 flex items-center mx-auto max-w-4xl">
      {data && (
        <>
          <img
            alt="profile-pic"
            src={data?.picture}
            className="w-8 rounded flex-shrink-0 shadow"
          />
          <p className="ml-2 mr-3 w-3/5 truncate">{data?.name}</p>
        </>
      )}
      <Link href="/">
        <Button className="ml-auto flex-shrink-0 flex items-center pl-2 rounded bg-transparent text-black border shadow-none">
          <img
            alt="product icon"
            src={ChevronLeftIcon}
            className="text-white mr-1 w-5"
          />
          Kembali
        </Button>
      </Link>
    </nav>
  )
}

export default ProductPage
