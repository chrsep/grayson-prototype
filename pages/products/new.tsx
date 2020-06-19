import React from "react"
import Link from "next/link"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../../components/Button/Button"
import ChevronLeftIcon from "../../icons/chevron-left.svg"

const NewProductPage = () => (
  <>
    <Header />
    <main className="mx-auto max-w-4xl">
      <div className="flex">
        <h1 className="text-4xl font-bold mx-3">Produk baru</h1>
      </div>
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
      <Link href="/products">
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

export default NewProductPage
