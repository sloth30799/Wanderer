import GridLoader from "react-spinners/GridLoader"
import { LengthType } from "react-spinners/helpers/props"

export const Spinner = (props: { color: string; size: LengthType }) => {
  return (
    <GridLoader {...props} aria-label="Loading Spinner" data-testid="loader" />
  )
}
