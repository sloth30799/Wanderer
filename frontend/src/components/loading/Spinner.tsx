import RingLoader from "react-spinners/RingLoader"
import { LengthType } from "react-spinners/helpers/props"

export const Spinner = (props: { color: string; size: LengthType }) => {
  return (
    <RingLoader {...props} aria-label="Loading Spinner" data-testid="loader" />
  )
}
