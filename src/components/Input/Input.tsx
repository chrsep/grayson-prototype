import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react"
import style from "./Input.module.css"

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
const Input: FC<Props> = ({ className, ...props }) => {
  return <input className={`${style.base} ${className}`} {...props} />
}

export default Input
