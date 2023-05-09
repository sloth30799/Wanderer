import { GridLoader } from "react-spinners"

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <GridLoader color="#ff9900" />
    </div>
  )
}

export default LoadingScreen
