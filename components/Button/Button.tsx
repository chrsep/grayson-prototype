import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import styles from "./Button.module.css"

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  outline?: boolean
  className?: string
}
const Button: FC<Props> = ({ className = "default", outline, ...props }) => {
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return (
    <button
      className={`
  ${styles.base} 
  ${className}
  ${
    outline &&
    "flex justify-center items-center rounded bg-transparent text-black border shadow-none"
  }
  `}
      {...props}
    />
  )
}

export default Button
