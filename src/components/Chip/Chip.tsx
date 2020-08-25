import { FC } from "react"
import styles from "./Chip.module.css"

export interface ChipProps {
  text: string
  onClick?: () => void
  selected?: boolean
  className?: string
}
const Chip: FC<ChipProps> = ({ className, selected, onClick, text }) => {
  return (
    <button
      type="button"
      className={`${className} ${styles.chip} ${selected && styles.selected}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Chip
