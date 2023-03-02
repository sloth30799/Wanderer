import React from "react"
import { Button, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import logoWhite from "../../assets/default-monochrome-white.svg"

const styles = {
  link: `no-underline text-tealBlue hover:text-goldenYellow`,
}

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 sm:flex-row sm:space-y-0">
        <div className="flex flex-col-reverse items-center justify-between space-y-12 sm:flex-col sm:space-y-0 sm:items-start">
          <div className="mx-auto my-6 text-center text-white sm:hidden">
            Copyright &copy; 2023, All Rights Reserved
          </div>
          <div>
            <img src={logoWhite} className="h-8" alt="" />
          </div>
          <div className="flex justify-center space-x-4">
            <Link href="https://twitter.com/hanyehtun" target={"_blank"}>
              <img src="imgs/icon-twitter.svg" alt="" className="h-8" />
            </Link>
          </div>
        </div>
        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3 text-white">
            <Link to="#" className={styles.link}>
              Home
            </Link>
            <Link
              href="https://hanyehtun.netlify.app/"
              target={"_blank"}
              className={styles.link}
            >
              Developer
            </Link>
            <Link to="/feed" className={styles.link}>
              Feed
            </Link>
          </div>
          <div className="flex flex-col space-y-3 text-white">
            <Link to="#" className={styles.link} in>
              Careers
            </Link>
            <Link to="#" className={styles.link}>
              Templates
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <form>
            <div className="flex space-x-3">
              <TextField
                variant="outlined"
                type="text"
                className="bg-white"
                placeholder="Updated in your inbox"
              />
              <Button
                variant="contained"
                className="bg-whiteSmoke text-tealBlue rounded-lg hover:bg-tealBlue hover:text-white"
              >
                Go
              </Button>
            </div>
          </form>
          <div className="hidden text-white sm:block">
            Copyright &copy; 2023, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
