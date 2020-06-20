import React, { ChangeEventHandler, FC, useState } from "react"
import Link from "next/link"
import useGetUserProfileApi from "../../hooks/useGetUserProfileApi"
import Button from "../../components/Button/Button"
import ChevronLeftIcon from "../../icons/chevron-left.svg"
import Input from "../../components/Input/Input"
import PlusIcon from "../../icons/plus-black.svg"

const NewProductPage = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [note, setNote] = useState("")

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mx-3 flex-shrink-0 mt-auto">
          Produk Baru
        </h1>
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
        <div className="flex mt-3">
          <ImageUploader />
        </div>
        <div className="flex p-3">
          <Button outline className="flex-shrink-0 mr-2">
            Reset Ulang
          </Button>
          <Button className="w-full">Simpan</Button>
        </div>
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
        <Button outline className="ml-auto flex-shrink-0 pl-2">
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
    <label className="border rounded text-sm px-3 py-3 bg-white ml-3 text-sm text-gray-800">
      <img alt="foto" src={PlusIcon} className="mx-auto" />
      Gambar
      <input type="file" className="hidden" />
    </label>
  )
}
export default NewProductPage
