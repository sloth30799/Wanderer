import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const Cta = () => {
  return (
    <div
      id="cta"
      className="container m-auto flex flex-col items-center justify-center rounded-2xl rounded-br-[5rem] gap-3 my-12 h-72 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300"
    >
      <h1 className="font-title font-extrabold text-center text-white">
        Why settle for a cookie-cutter vacation when you can have a
        one-of-a-kind travel experience?
      </h1>
      <Link to="login" className="text-black">
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          className="bg-white hover:bg-brightOrange hover:text-white hover:shadow-black"
        >
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default Cta
