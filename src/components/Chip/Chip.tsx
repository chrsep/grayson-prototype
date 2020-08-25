import { FC } from "react"
import styles from "./Chip.module.css"

export interface ChipProps {
  text: string
  onClick: () => void
  selected: boolean
}
const Chip: FC<ChipProps> = ({ selected, onClick, text }) => {
  return (
    <button
      className={`${styles.chip} ${selected && styles.selected}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Chip
