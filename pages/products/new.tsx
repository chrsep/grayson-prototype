import React, { ChangeEventHandler, FC, useState } from "react"
import Link from "next/link"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../../components/Button/Button"
import ChevronLeftIcon from "../../icons/chevron-left.svg"
import Input from "../../components/Input/Input"
import PhotoIcon from "../../icons/photo.svg"

const NewProductPage = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [note, setNote] = useState("")

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl">
        <div className="flex content-end">
          <h1 className="text-3xl font-bold mx-3 flex-shrink-0 mt-auto">
            Produk Baru
          </h1>
          <ImageUploader />
        </div>
        <TextField
          id="name"
          label="Nama produk / jasa"
          placeholder="Belum di-isi"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <TextField
          id="price"
          label="Harga"
          placeholder="Rp. 0"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />
        <TextField
          id="note"
          label="Catatan"
          placeholder="Belum di-isi"
          value={note}
          onChange={(e) => {
            setNote(e.target.value)
          }}
        />
      </main>
    </>
  )
}

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
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
}
const TextField: FC<TextFieldProps> = ({
  id,
  label,
  onChange,
  placeholder,
  value,
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
        value={value}
      />
    </div>
  )
}

const ImageUploader: FC = () => {
  return (
    <label className="border rounded text-sm px-3 py-4 ml-auto mr-3 bg-white">
      <img alt="foto" src={PhotoIcon} className="mx-auto mb-1" />
      Upload gambar
      <input type="file" className="hidden" />
    </label>
  )
}
export default NewProductPage
