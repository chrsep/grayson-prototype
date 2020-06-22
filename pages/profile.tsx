import React, { ChangeEventHandler, FC, useEffect, useState } from "react"
import { generateUrl } from "../utils/cloudinary"
import Button from "../components/Button/Button"
import Input from "../components/Input/Input"
import usePostProductImage from "../hooks/usePostProductImage"
import PlusIcon from "../icons/plus-black.svg"
import { PostImageResponse } from "./api/images"

const ProfilePage: FC = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [note, setNote] = useState("")
  const [images, setImages] = useState<string[]>([])

  const [error, setError] = useState("")

  return (
    <>
      <main className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mx-3 flex-shrink-0 mt-auto">
          Data Diri
        </h1>
        <form>
          <TextField
            id="name"
            label="Nama produk / jasa"
            placeholder="Belum di-isi"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <CurrencyField
            id="price"
            label="Harga"
            placeholder="0"
            required
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
          {images.length > 0 && (
            <p className="mx-4 md:mx-0 mt-3 text-sm text-gray-800">
              Ter-pasang {images.length} gambar
            </p>
          )}
          <div className="flex mt-3 overflow-x-auto">
            <ImageUploader
              onChange={(image) => setImages([...images, image])}
              onError={setError}
            />
            {images.map((image) => {
              return (
                <img
                  key={image}
                  src={generateUrl(image, { width: 160 })}
                  alt="gambar produk"
                  className="h-20 border rounded mr-3"
                />
              )
            })}
          </div>
          {error && (
            <div className="ml-3 md:ml-0 mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="flex py-3 px-3 md:px-0">
            <Button outline className="flex-shrink-0 mr-3">
              Reset Ulang
            </Button>
            <Button className="w-full">Simpan</Button>
          </div>
        </form>
      </main>
    </>
  )
}

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  required?: boolean
}
const TextField: FC<TextFieldProps> = ({
  id,
  label,
  onChange,
  placeholder,
  value,
  required,
}) => {
  return (
    <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
      <label htmlFor={id} className="inline-block w-full text-sm">
        {label}
      </label>
      <Input
        required={required}
        id={id}
        placeholder={placeholder}
        className="w-full py-1 px-0"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

interface CurrencyField {
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  required?: boolean
}
const CurrencyField: FC<CurrencyField> = ({
  id,
  label,
  onChange,
  placeholder,
  value,
  required,
}) => {
  return (
    <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
      <label htmlFor={id} className="inline-block w-full text-sm">
        {label}
      </label>
      <div className="flex items-center">
        <p className="text-gray-600">Rp</p>
        <Input
          required={required}
          id={id}
          placeholder={placeholder}
          className="w-full py-1 px-0 ml-1"
          onChange={onChange}
          value={value}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
    </div>
  )
}

interface ImageUploaderProps {
  onChange: (image: string) => void
  onError: (error: string) => void
}
const ImageUploader: FC<ImageUploaderProps> = ({ onChange, onError }) => {
  const [mutate, { status, error }] = usePostProductImage()

  useEffect(() => {
    if (error) {
      onError(error.message)
    }
  }, [error])

  return (
    <label className=" h-20 w-20 border rounded text-sm bg-white ml-3 md:ml-0 text-sm text-gray-800 flex flex-col items-center justify-center flex-shrink-0 mr-3 cursor-pointer">
      {status === "loading" ? (
        <div>loading...</div>
      ) : (
        <>
          <img alt="foto" src={PlusIcon} className="mx-auto" />
          Gambar
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={async (e) => {
              const file = e?.target?.files?.[0]
              if (file) {
                const result = await mutate(file)
                if (result?.ok) {
                  const imageData: PostImageResponse = await result.json()
                  onChange(imageData.id)
                }
              }
            }}
          />
        </>
      )}
    </label>
  )
}

export default ProfilePage
