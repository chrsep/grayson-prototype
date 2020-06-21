import React from "react"
import Link from "next/link"
import PlusIcon from "../../icons/plus.svg"

const ProductPage = () => (
  <>
    <main className="mx-auto max-w-4xl">
      <div className="flex">
        <h1 className="text-3xl font-bold mx-3">Produk-ku</h1>
        <Link href="/products/new">
          <button className="bg-black rounded-full py-3 pl-3 pr-6 shadow absolute right-0 bottom-0 m-3 z-50 text-white flex items-center md:relative md:ml-auto text-sm">
            <img alt="Produk baru" src={PlusIcon} className="mr-2" />
            Tambah Produk
          </button>
        </Link>
      </div>
      <picture>
        <source
          srcSet={require("../../images/you-no-product.png?webp&width=672")}
          type="image/webp"
        />
        <source
          srcSet={require("../../images/you-no-product.png?resize&size=672")}
          type="image/jpeg"
        />
        <img
          className="w-64 mx-auto mt-12"
          alt="No plans yet illustration"
          src={require("../../images/you-no-product.png?resize&size=672")}
        />
      </picture>
      <h6 className="mt-8 text-center text-xl text-gray-900">
        Anda belum menambahkan produk
      </h6>
    </main>
  </>
)

export default ProductPage
