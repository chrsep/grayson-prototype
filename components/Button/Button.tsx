import { FC } from "react"
import styles from "./Button.module.css"

interface Props {
  variant?: keyof typeof styles
}
const Button: FC<Props> = ({ variant = "default", ...props }) => {
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return <button className={`${styles.base} ${styles[variant]}`} {...props} />
}

export default Button
