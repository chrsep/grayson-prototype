import React, { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import PlusIcon from "../../icons/plus-black.svg"
import usePostImage from "../../hooks/usePostImage"
import { PostImageResponse } from "../api/images"
import { generateUrl } from "../../utils/cloudinary"
import CancelIcon from "../../icons/cancel.svg"
import CheckIcon from "../../icons/check.svg"
import useGetProductDetails from "../../hooks/useGetProductDetails"
import usePatchProduct from "../../hooks/usePatchProduct"
import useDeleteProduct from "../../hooks/useDeleteProduct"

const EditProductPage = () => {
  const {
    query: { id },
  } = useRouter()
  const { data, status } = useGetProductDetails((id as string) ?? "")

  return (
    <>
      <main className="mx-auto max-w-4xl pt-6">
        <h1 className="text-3xl font-bold mx-3 flex-shrink-0 mt-auto">
          Edit Produk
        </h1>

        {status === "success" && data && (
          <Form
            id={id as string}
            name={data.name}
            description={data.description}
            images={data.images ?? []}
            price={data.price?.toString()}
            hidden={data.hidden}
          />
        )}
      </main>
    </>
  )
}

interface FormProps {
  id: string
  name: string
  price: string
  description: string
  images: string[]
  hidden: boolean
}
const Form: FC<FormProps> = ({
  id,
  name,
  price,
  description,
  images,
  hidden,
}) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [patch] = usePatchProduct(id)
  const [deleteProduct] = useDeleteProduct(id)

  return (
    <form>
      <TextField
        id="name"
        label="Nama produk / jasa"
        placeholder="Belum di-isi"
        onSubmit={(newName) => patch({ name: newName })}
        originalValue={name}
      />
      <CurrencyField
        id="price"
        label="Harga"
        placeholder="0"
        originalValue={price}
        onSubmit={(value) => patch({ price: parseInt(value, 10) })}
      />
      <TextAreaField
        id="description"
        label="Deskripsi"
        placeholder="Belum di-isi"
        originalValue={description}
        onSubmit={(value) => patch({ description: value })}
      />
      {images.length > 0 && (
        <p className="mx-4 md:mx-0 mt-3 text-sm text-gray-800">
          Ter-pasang {images.length} gambar
        </p>
      )}
      <div className="flex mt-3 overflow-x-auto">
        <ImageUploader onChange={() => {}} onError={setError} />
        {images.map((image) => {
          return (
            <img
              key={image}
              src={generateUrl(image, { width: 160 })}
              alt="gambar produk"
              className="h-20 border rounded mr-3 object-cover"
            />
          )
        })}
      </div>
      {error && (
        <div className="ml-3 md:ml-0 mt-2 text-sm text-red-600">{error}</div>
      )}
      {hidden && (
        <div className="text p-3 mt-3 rounded border border-yellow-300 bg-yellow-200 text-sm">
          <p className="font-bold text-yellow-800">Produk Tersembunyi-kan</p>
          Produk ini tak akan terlihat oleh pengguna lain.
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center px-3 md:px-0 mt-3">
        {hidden ? (
          <Button
            type="button"
            className="mb-3 md:mb-0"
            onClick={async () => {
              await patch({ hidden: false })
            }}
          >
            Tampilkan
          </Button>
        ) : (
          <Button
            outline
            type="button"
            className="text-yellow-700 font-bold mb-3"
            onClick={async () => {
              await patch({ hidden: true })
            }}
          >
            Sembunyi-kan
          </Button>
        )}
        <Button
          type="button"
          outline
          className="flex-shrink-0 mr-3 text-red-700 font-bold md:ml-3 md:mb-0"
          onClick={async () => {
            const result = await deleteProduct()
            if (result.ok) {
              await router.push("/products")
            }
          }}
        >
          Hapus
        </Button>
      </div>
    </form>
  )
}

const TextField: FC<{
  id: string
  originalValue?: string
  onSubmit: (value: string) => void
  label: string
  placeholder: string
}> = ({ id, originalValue = "", onSubmit, label, placeholder }) => {
  const [value, setValue] = useState(originalValue)

  return (
    <div className="items-end overflow-auto bg-white border md:rounded mt-3 w-full pl-3 pr-2 py-2 focus-within:shadow-outline">
      <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
        {label}
      </label>
      <div className="flex items-center">
        <Input
          id={id}
          placeholder={placeholder}
          className="w-full py-1 px-0 outline-none"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        {value !== originalValue && (
          <>
            <Button
              outline
              type="button"
              className="mr-2 px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => setValue(originalValue)}
            >
              <img alt="cancel" src={CancelIcon} className="w-5" />
            </Button>
            <Button
              type="button"
              className="px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => onSubmit(value)}
            >
              <img alt="accept" className="mx-auto w-5" src={CheckIcon} />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

const TextAreaField: FC<{
  id: string
  originalValue?: string
  onSubmit: (value: string) => void
  label: string
  placeholder: string
}> = ({ id, label, placeholder, onSubmit, originalValue = "" }) => {
  const [value, setValue] = useState(originalValue)

  return (
    <div className="items-end overflow-auto bg-white border md:rounded mt-3 w-full pl-3 pr-2 py-2 focus-within:shadow-outline">
      <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
        {label}
      </label>
      <div className="flex items-center">
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          className="w-full py-1 px-0 outline-none h-32"
          onChange={(e) => setValue(e.target.value)}
        />

        {value !== originalValue && (
          <>
            <Button
              outline
              type="button"
              className="mr-2 px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => setValue(originalValue)}
            >
              <img alt="cancel" src={CancelIcon} className="w-5" />
            </Button>
            <Button
              type="button"
              className="px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => onSubmit(value)}
            >
              <img alt="accept" className="mx-auto w-5" src={CheckIcon} />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

const CurrencyField: FC<{
  id: string
  originalValue?: string
  onSubmit: (value: string) => void
  label: string
  placeholder: string
}> = ({ id, label, onSubmit, placeholder, originalValue = "" }) => {
  const [value, setValue] = useState(originalValue)

  return (
    <div className="items-end overflow-auto bg-white border md:rounded mt-3 w-full pl-3 pr-2 py-2 focus-within:shadow-outline">
      <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
        {label}
      </label>
      <div className="flex items-center">
        <Input
          id={id}
          placeholder={placeholder}
          className="w-full py-1 px-0 outline-none"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        {value !== originalValue && (
          <>
            <Button
              outline
              type="button"
              className="mr-2 px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => setValue(originalValue)}
            >
              <img alt="cancel" src={CancelIcon} className="w-5" />
            </Button>
            <Button
              type="button"
              className="px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => onSubmit(value)}
            >
              <img alt="accept" className="mx-auto w-5" src={CheckIcon} />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

const ImageUploader: FC<{
  onChange: (image: string) => void
  onError: (error: string) => void
}> = ({ onChange, onError }) => {
  const [mutate, { status, error }] = usePostImage()
  const [loadingImage, setLoadingImage] = useState(false)

  useEffect(() => {
    if (error) {
      onError(error.message)
    }
  }, [error])

  return (
    <label className=" h-20 w-20 border rounded text-sm bg-white ml-3 md:ml-0 text-sm text-gray-800 flex flex-col items-center justify-center flex-shrink-0 mr-3 cursor-pointer">
      {status === "loading" || loadingImage ? (
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
                  setLoadingImage(true)
                  const imageData: PostImageResponse = await result.json()
                  await fetch(generateUrl(imageData.id, { width: 160 }))
                  setLoadingImage(false)
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
export default EditProductPage
