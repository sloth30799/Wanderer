import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const Cta = () => {
  return (
    <div id="cta" className="container m-auto">
      <div className="flex flex-col items-center justify-center rounded-3xl rounded-br-[5rem] gap-3 my-12 mx-3 px-6 py-12   bg-brightOrange lg:bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300">
        <h1 className="font-title font-extrabold text-3xl text-center text-white m-0">
          Why settle for a cookie-cutter vacation when you can have a
          one-of-a-kind travel experience?
        </h1>
        <Link to="login" className="text-black">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className="bg-white hover:bg-tealBlue hover:text-white shadow-black"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Cta
