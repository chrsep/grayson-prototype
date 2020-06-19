import React from "react"

const ProductPage = () => (
  <>
    <h1 className="text-4xl font-bold mx-3">Produk-ku</h1>
    <picture>
      <source
        srcSet={require("../images/you-no-product.png?webp")}
        type="image/webp"
      />
      <source
        srcSet={require("../images/you-no-product.png")}
        type="image/jpeg"
      />
      <img
        className="w-64 mx-auto mt-12"
        alt="No plans yet illustration"
        src={require("../images/you-no-product.png")}
      />
    </picture>
    <h6 className="mt-8 text-center text-xl text-gray-900">
      Anda belum menambahkan produk
    </h6>
  </>
)

export default ProductPage
