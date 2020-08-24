import { FC } from "react"
import styles from "./Chip.module.css"

export interface ChipProps {
  text: string
}
const Chip: FC<ChipProps> = ({ text }) => {
  return <div className={`${styles.chip}`}>{text}</div>
}

export default Chip
