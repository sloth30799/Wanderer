import { GridLoader } from "react-spinners"

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex gap-3 justify-center items-center">
      <GridLoader color="#ff9900" />
    </div>
  )
}

export default LoadingScreen
