import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Button, Link } from "@mui/material"

const styles = {
  container: `bg-goldenYellow mt-6`,
}

const Cta = () => {
  return (
    <section id="cta" className={styles.container}>
      <div className="container flex flex-col items-center justify-between px-6 py-12 mx-auto space-y-12 sm:py-6 sm:flex-row sm:space-y-0">
        <h2 className="text-3xl font-bold leading-tight text-center text-white sm:text-3xl sm:max-w-xl sm:text-left">
          Start Your Journey with Wanderer Now!
        </h2>
        <div>
          <Link
            to="/login"
            component={RouterLink}
            underline="none"
            replace="true"
          >
            <Button
              variant="outlined"
              className="bg-whiteSmoke text-goldenYellow border-goldenYellow rounded-lg hover:bg-tealBlue hover:text-white"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cta
