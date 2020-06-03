import { FC } from "react"
import styles from "./Button.module.css"

interface Props {
  className?: string
}
const Button: FC<Props> = ({ className = "default", ...props }) => {
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return <button className={`${styles.base} ${className}`} {...props} />
}

export default Button
