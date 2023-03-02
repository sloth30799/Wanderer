import React from "react"
import { Button, Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import logo from "../../assets/logo.png"

const Hero = () => {
  return (
    <section className="hero bg-hero-pattern bg-cover">
      <nav className="relative container mx-auto p-3">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <Link to="/" component={RouterLink} underline="none">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="hidden sm:flex space-x-6">
            <Link
              href="https://hanyehtun.netlify.app/"
              target={"_blank"}
              underline="none"
              color={"black"}
              className="hover:text-goldenYellow font-bold"
            >
              Developer
            </Link>
            <Link
              to="/feed"
              component={RouterLink}
              underline="none"
              color={"black"}
              className="hover:text-goldenYellow font-bold"
            >
              Feed
            </Link>
            <Link
              to="/profile"
              component={RouterLink}
              underline="none"
              color={"black"}
              className="hover:text-goldenYellow font-bold"
            >
              Profile
            </Link>
            <Link
              to="/gearTemplate"
              component={RouterLink}
              underline="none"
              color={"black"}
              className="hover:text-goldenYellow font-bold"
            >
              Templates
            </Link>
          </div>
        </div>
      </nav>
      <div className="container flex flex-col-reverse sm:flex-row items-center px-6 mx-auto mt-5 space-y-0">
        <div className="flex flex-col mb-32 space-y-12 sm:w-1/2">
          <h1 className="max-w-sm text-3xl font-bold text-center text-goldenYellow sm:text-left sm:text-5xl">
            Get inspired and start planning your dream trip today.
          </h1>
          <p className="max-w-sm text-center text-whiteSmoke sm:text-left">
            Discover new cultures, try new foods, and create unforgettable
            memories with{" "}
            <span className="font-bold text-goldenYellow">Wanderer</span>
            .Get out of your comfort zone and make new friends and make your
            travel dreams a reality.
          </p>
          <div className="flex justify-center sm:justify-start">
            <Link to="/login" component={RouterLink} underline="none">
              <Button
                variant="contained"
                className="rounded-lg bg-goldenYellow hover:bg-whiteSmoke font-pally hover:text-goldenYellow"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
