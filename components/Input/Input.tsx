import { FC, HTMLProps } from "react"
import style from "./Input.module.css"

interface Props extends HTMLProps<HTMLInputElement> {}
const Input: FC<Props> = ({ className, ...props }) => {
  return <input className={`${style.base} ${className}`} {...props} />
}

export default Input
