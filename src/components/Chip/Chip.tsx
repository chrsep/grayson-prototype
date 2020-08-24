import { FC } from "react"

export interface ChipProps {
  text: string
}
const Chip: FC<ChipProps> = ({ text }) => {
  return <div>{text}</div>
}

export default Chip
