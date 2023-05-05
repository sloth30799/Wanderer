import RingLoader from "react-spinners/RingLoader"
import { LengthType } from "react-spinners/helpers/props"

export const Spinner = (props: { color: string; size: LengthType }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-title text-white text-xl">Wandering...</h1>
      <RingLoader
        {...props}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
