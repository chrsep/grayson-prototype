import { ButtonHTMLAttributes, FC } from "react"
import styles from "./Button.module.css"

interface Props {
  outline?: boolean
  className?: string
  onClick?: () => void
  type?: ButtonHTMLAttributes<any>["type"]
}

const Button: FC<Props> = ({
  onClick,
  className = "default",
  outline,
  children,
  type,
}) => (
  <button
    className={`${className} ${styles.base} ${outline && styles.outline}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
)

export default Button
