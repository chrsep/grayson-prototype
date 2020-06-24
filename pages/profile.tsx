import React, { ChangeEventHandler, FC, useEffect, useState } from "react"
import Button from "../components/Button/Button"
import Input from "../components/Input/Input"
import usePostProductImage from "../hooks/usePostProductImage"
import { PostImageResponse } from "./api/images"
import useGetUserProfileApi from "../hooks/useGetUserProfileApi"
import CancelIcon from "../icons/cancel.svg"
import CheckIcon from "../icons/check.svg"

const ProfilePage: FC = () => {
  const { data } = useGetUserProfileApi()

  return (
    <>
      <main className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mx-3 flex-shrink-0 mt-auto">
          Data Diri
        </h1>
        {data && (
          <Form
            name={data.name}
            phone={data.phone}
            address={data.address}
            picture={data.picture}
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
}
const Form: FC<FormProps> = (props) => {
  const [name, setName] = useState(props.name)
  const [address, setAddress] = useState(props.address)
  const [phone, setPhone] = useState(props.phone)

  const [error, setError] = useState("")
  return (
    <form className="fade-in">
      <TextField
        id="name"
        label="Nama"
        placeholder="Belum di-isi"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <TextField
        id="phone"
        label="Telefon / HP"
        placeholder="Belum di-isi"
        required
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value)
        }}
      />
      <TextField
        id="phone"
        label="WhatsApp"
        placeholder="Belum di-isi"
        required
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value)
        }}
      />
      <TextAreaField
        id="address"
        label="Alamat"
        placeholder="Belum di-isi"
        required
        value={address}
        onChange={(e) => {
          setAddress(e.target.value)
        }}
      />

      <ChangeImageForm original={props.picture} onError={setError} />
      {error && (
        <div className="ml-3 md:ml-0 mt-2 text-sm text-red-600">{error}</div>
      )}
    </form>
  )
}

const ChangeImageForm: FC<{
  original: string
  onError: (error: string) => void
}> = ({ original, onError }) => {
  const [image, setImage] = useState(original)

  return (
    <div className="flex flex-col mt-3 w-32 mx-3 md:mx-0">
      <img
        src={image}
        alt="profil"
        className="mb-1 border rounded-lg mr-3 w-full h-32"
      />
      {image === original ? (
        <ImageUploader
          onChange={(newImage) => setImage(newImage)}
          onError={onError}
        />
      ) : (
        <div className="flex w-32">
          <Button
            outline
            type="button"
            className="mr-2 px-2 flex-shrink-0"
            onClick={() => setImage(original)}
          >
            <img alt="cancel" src={CancelIcon} className="w-5" />
          </Button>
          <Button type="button" className="w-full">
            <img alt="accept" className="mx-auto w-5" src={CheckIcon} />
          </Button>
        </div>
      )}
    </div>
  )
}

interface TextFieldProps {
  id: string
  label: string
  value?: string
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
    <label>
      {status === "loading" ? (
        <div>loading...</div>
      ) : (
        <>
          <div
            role="button"
            tabIndex={0}
            className="w-full bg-black text-white text-center rounded py-2 shadow text-sm focus:shadow-outline"
          >
            Ubah Gambar
          </div>
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

interface TextAreaFieldProps {
  id: string
  label: string
  value?: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder: string
  required?: boolean
}
const TextAreaField: FC<TextAreaFieldProps> = ({
  id,
  label,
  onChange,
  placeholder,
  value,
  required,
}) => {
  return (
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
}

export default ProfilePage
