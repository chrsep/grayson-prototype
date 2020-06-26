import React, { FC, useEffect, useState } from "react"
import Button from "../components/Button/Button"
import Input from "../components/Input/Input"
import usePostImage from "../hooks/usePostImage"
import { PostImageResponse } from "./api/images"
import useGetUserProfileApi from "../hooks/useGetUserProfileApi"
import CancelIcon from "../icons/cancel.svg"
import CheckIcon from "../icons/check.svg"
import { generateUrl } from "../utils/cloudinary"
import usePatchProfile from "../hooks/usePatchProfile"

const ProfilePage: FC = () => {
  const { data } = useGetUserProfileApi()

  return (
    <>
      <main className="mx-auto max-w-4xl pb-8">
        <div className="flex">
          <h1
            className="text-3xl font-bold ml-3 flex-shrink-0 mr-auto"
            style={{ marginTop: 100 }}
          >
            Data Diri
          </h1>
          {data && <ChangeImageForm original={data.picture} />}
        </div>
        {data && (
          <Form
            name={data.name}
            phone={data.phone}
            address={data.address}
            picture={data.picture}
            whatsapp={data.whatsapp}
          />
        )}
      </main>
    </>
  )
}

interface FormProps {
  name: string
  picture: string
  address?: string
  phone?: string
  whatsapp?: string
}
const Form: FC<FormProps> = (props) => {
  const [mutate] = usePatchProfile()

  return (
    <form className="fade-in pb-8">
      <TextField
        id="name"
        label="Nama Lengkap"
        placeholder="Belum di-isi"
        original={props.name}
        onSubmit={(name) => mutate({ name })}
      />
      <TextField
        id="phone"
        label="Telefon / HP"
        placeholder="Belum di-isi"
        original={props.phone}
        onSubmit={(phone) => mutate({ phone })}
      />
      <TextField
        id="whatsapp"
        label="WhatsApp"
        placeholder="Belum di-isi"
        original={props.whatsapp}
        onSubmit={(whatsapp) => mutate({ whatsapp })}
      />
      <TextAreaField
        id="address"
        label="Alamat"
        placeholder="Belum di-isi"
        original={props.address}
        onSubmit={(address) => mutate({ address })}
      />
    </form>
  )
}

const TextField: FC<{
  id: string
  original?: string
  onSubmit: (value?: string) => void
  label: string
  placeholder: string
}> = ({ id, original = "", onSubmit, label, placeholder }) => {
  const [name, setName] = useState(original)

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
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {name !== original && (
          <>
            <Button
              outline
              type="button"
              className="mr-2 px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => setName(original)}
            >
              <img alt="cancel" src={CancelIcon} className="w-5" />
            </Button>
            <Button
              type="button"
              className="px-2 py-1 flex-shrink-0 fade-in"
              onClick={() => onSubmit(name)}
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
  original?: string
  onSubmit: (value?: string) => void
  label: string
  placeholder: string
}> = ({ id, original = "", onSubmit, label, placeholder }) => {
  const [name, setName] = useState(original)

  return (
    <div className="items-end overflow-auto bg-white border md:rounded mt-3 w-full pl-3 pr-2 py-2 focus-within:shadow-outline">
      <label htmlFor={id} className="inline-block w-full text-sm text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className="w-full py-1 px-0 outline-none h-16"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <div
        className={`flex ${
          name === original && "opacity-0"
        } transition-opacity duration-100`}
      >
        <Button
          outline
          type="button"
          className="mr-2 px-2 py-1 flex-shrink-0 fade-in ml-auto"
          onClick={() => setName(original)}
        >
          <img alt="cancel" src={CancelIcon} className="w-5" />
        </Button>
        <Button
          type="button"
          className="px-2 py-1 flex-shrink-0 fade-in"
          onClick={() => onSubmit(name)}
        >
          <img alt="accept" className="mx-auto w-5" src={CheckIcon} />
        </Button>
      </div>
    </div>
  )
}

const ChangeImageForm: FC<{
  original: string
}> = ({ original }) => {
  const [image, setImage] = useState(original)
  const [error, setError] = useState<string>()
  const [mutate] = usePatchProfile()

  return (
    <div className="flex flex-col mt-3 w-24 mx-3 md:mx-0">
      <img
        alt="profil"
        className="mb-1 border rounded-lg mr-3 w-full h-24 object-cover"
        src={generateUrl(image, { width: 160, height: 160 })}
      />
      {image === original ? (
        <ImageUploader
          onChange={(newImage) => setImage(newImage)}
          onError={setError}
        />
      ) : (
        <div className="flex w-24">
          <Button
            outline
            type="button"
            className="mr-2 px-2 flex-shrink-0"
            onClick={() => setImage(original)}
          >
            <img alt="cancel" src={CancelIcon} className="w-5" />
          </Button>
          <Button
            type="button"
            className="w-full"
            onClick={async () => {
              await mutate({ image })
            }}
          >
            <img alt="accept" className="mx-auto w-5" src={CheckIcon} />
          </Button>
        </div>
      )}
      {error && (
        <div className="ml-3 md:ml-0 mt-2 text-sm text-red-600">{error}</div>
      )}
    </div>
  )
}

interface ImageUploaderProps {
  onChange: (image: string) => void
  onError: (error: string) => void
}
const ImageUploader: FC<ImageUploaderProps> = ({ onChange, onError }) => {
  const [mutate, { status, error }] = usePostImage()
  const [loadingImage, setLoadingImage] = useState(false)

  useEffect(() => {
    if (error) {
      onError(error.message)
    }
  }, [error])

  return (
    <label>
      <>
        <div
          role="button"
          tabIndex={0}
          className="w-full bg-black text-white text-center rounded py-2 p-x1 shadow focus:shadow-outline text-xs"
        >
          {status === "loading" || loadingImage ? "loading..." : "Ubah Gambar"}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          disabled={status === "loading" || loadingImage}
          onChange={async (e) => {
            const file = e?.target?.files?.[0]
            if (file) {
              const result = await mutate(file)
              if (result?.ok) {
                setLoadingImage(true)
                const imageData: PostImageResponse = await result.json()
                await fetch(
                  generateUrl(imageData.id, { width: 160, height: 160 })
                )
                setLoadingImage(false)
                onChange(imageData.id)
              }
            }
          }}
        />
      </>
    </label>
  )
}

export default ProfilePage
