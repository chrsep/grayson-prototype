import React, { ChangeEventHandler, FC } from "react"
import Link from "next/link"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../../components/Button/Button"
import ChevronLeftIcon from "../../icons/chevron-left.svg"
import Input from "../../components/Input/Input"

const NewProductPage = () => (
  <>
    <Header />
    <main className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mx-3">Produk Baru</h1>
      <TextField
        id="name"
        onChange={() => {}}
        label="Nama produk / jasa"
        placeholder="Belum di-isi"
      />
      <TextField
        id="price"
        onChange={() => {}}
        label="Harga"
        placeholder="Rp. 0"
      />
      <TextField
        id="note"
        onChange={() => {}}
        label="Catatan"
        placeholder="Belum di-isi"
      />
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

interface TextFieldProps {
  id: string
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
}
const TextField: FC<TextFieldProps> = ({
  id,
  label,
  onChange,
  placeholder,
}) => {
  return (
    <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
      <label htmlFor={id} className="inline-block w-full text-sm">
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        className="w-full py-1 px-0"
        onChange={onChange}
      />
    </div>
  )
}

export default NewProductPage
