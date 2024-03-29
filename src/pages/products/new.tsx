import React, { ChangeEventHandler, FC, useState } from "react"
import { useRouter } from "next/router"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import PlusIcon from "../../icons/plus-black.svg"
import usePostImage from "../../hooks/usePostImage"
import { PostImageResponse } from "../api/images"
import { generateUrl } from "../../utils/cloudinary"
import usePostNewProduct from "../../hooks/usePostNewProduct"
import CloudinaryImage from "../../components/CloudinaryImage/CloudinaryImage"
import CancelIcon from "../../icons/cancel.svg"
import useDeleteImage from "../../hooks/useDeleteImage"
import Chip from "../../components/Chip/Chip"
import { Categories } from "../../utils/categories"

const NewProductPage = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [category, setCategory] = useState<number>()

  const [error, setError] = useState("")
  const postNewProduct = usePostNewProduct()

  return (
    <>
      <main className="mx-auto max-w-4xl pt-6">
        <h1 className="text-3xl font-bold mx-3 flex-shrink-0 mt-auto">
          Tambah Produk
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const result = await postNewProduct.mutateAsync({
              name,
              price: parseInt(price, 10),
              description,
              images,
              category,
            })
            if (result.ok) {
              await router.push("/products")
            }
          }}
        >
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
          <TextAreaField
            id="description"
            label="Deskripsi"
            placeholder="Belum di-isi"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
          <ChipField
            label="Kategori"
            onChange={(value) => setCategory(value)}
            selectedValue={category}
            values={Categories}
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
                <Image
                  cloudinaryId={image}
                  onDelete={() =>
                    setImages(images.filter((imageId) => imageId !== image))
                  }
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
            <Button
              type="button"
              outline
              className="flex-shrink-0 mr-3"
              onClick={() => {
                setName("")
                setPrice("")
                setDescription("")
                setImages([])
              }}
            >
              Reset Ulang
            </Button>
            <Button className="w-full">Simpan</Button>
          </div>
        </form>
      </main>
    </>
  )
}

const TextField: FC<{
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  required?: boolean
}> = ({ id, label, onChange, placeholder, value, required }) => (
  <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
    <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
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

const TextAreaField: FC<{
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder: string
  required?: boolean
}> = ({ id, label, onChange, placeholder, value, required }) => (
  <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
    <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
      {label}
    </label>
    <textarea
      required={required}
      id={id}
      placeholder={placeholder}
      className="w-full py-1 px-0 h-32"
      onChange={onChange}
      value={value}
    />
  </div>
)

const CurrencyField: FC<{
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  required?: boolean
}> = ({ id, label, onChange, placeholder, value, required }) => (
  <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
    <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
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

const ChipField: FC<{
  label: string
  values: readonly string[]
  onChange: (selectedIndex: number) => void
  selectedValue?: number
}> = ({ label, onChange, values, selectedValue }) => (
  <div className="overflow-auto bg-white border md:rounded mt-3 w-full px-3 py-2">
    <div className="inline-block w-full text-sm text-gray-700">{label}</div>
    <div className="flex">
      {values.map((value, idx) => (
        <Chip
          key={value}
          text={value}
          onClick={() => onChange(idx)}
          selected={selectedValue === idx}
          className="capitalize mr-2 my-2"
        />
      ))}
    </div>
  </div>
)

interface ImageUploaderProps {
  onChange: (image: string) => void
  onError: (error: string) => void
}
const ImageUploader: FC<ImageUploaderProps> = ({ onChange, onError }) => {
  const [loadingImage, setLoadingImage] = useState(false)
  const { mutateAsync, status } = usePostImage({
    onError: (err) => onError(err.message),
  })

  return (
    <label className="h-20 w-20 border rounded text-sm bg-white ml-3 md:ml-0 text-sm text-gray-800 flex flex-col items-center justify-center flex-shrink-0 mr-3 cursor-pointer">
      {status === "loading" || loadingImage ? (
        <div>loading...</div>
      ) : (
        <>
          <PlusIcon className="mx-auto" />
          Gambar
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={async (e) => {
              const file = e?.target?.files?.[0]
              if (file) {
                const result = await mutateAsync(file)
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

const Image: FC<{ onDelete: () => void; cloudinaryId: string }> = ({
  onDelete,
  cloudinaryId,
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const deleteImage = useDeleteImage(cloudinaryId)

  return (
    <div className="flex-shrink-0">
      <CloudinaryImage
        key={cloudinaryId}
        alt="gambar produk"
        breakpoints={[{ viewport: 160, imageWidth: 160 }]}
        cloudinaryId={cloudinaryId}
        className="h-20 border rounded mr-3 cursor-pointer"
        onClick={() => setShowPreview(true)}
      />
      {showPreview && (
        <div className="fixed top-0 bottom-0 right-0 left-0 overflow-y-auto bg-black flex flex-col items-center">
          <div className="m-3 w-full max-w-3xl flex">
            <Button
              type="button"
              className="text-white font-bold"
              onClick={() => setShowPreview(false)}
            >
              <CancelIcon className="w-8 h-8" />
            </Button>
            <Button
              type="button"
              outline
              className="ml-auto mr-3 text-red-700 font-bold"
              onClick={async () => {
                const result = await deleteImage.mutateAsync()
                if (result.ok) onDelete()
              }}
            >
              Hapus
            </Button>
          </div>
          <CloudinaryImage
            key={cloudinaryId}
            alt="gambar produk"
            cloudinaryId={cloudinaryId}
            className="mr-3 w-full max-w-3xl"
          />
        </div>
      )}
    </div>
  )
}

export default NewProductPage
