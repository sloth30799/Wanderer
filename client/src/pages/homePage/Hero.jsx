import React from "react"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import logoWhite from "../../assets/default-monochrome-white.svg"

const styles = {
  logo: `text-whiteSmoke tracking-tighter font-extrabold font-body text-3xl`,
  link: `hover:text-goldenYellow font-bold text-black no-underline`,
  strong: `font-bold text-goldenYellow tracking-wide`,
}

const Hero = () => {
  return (
    <section className="bg-hero-pattern bg-cover">
      <nav className="relative container mx-auto p-3">
        <div className="flex items-center justify-between">
          <div className="">
            <img src={logoWhite} className="h-8 text-whiteSmoke" alt="" />
          </div>
          <div className="hidden sm:flex space-x-6">
            <Link to="profile" className={styles.link}>
              Profile
            </Link>
            <Link to="feed" className={styles.link}>
              Feed
            </Link>
            <Link
              href="https://hanyehtun.netlify.app/"
              target={"_blank"}
              className={styles.link}
            >
              Developer
            </Link>
          </div>
        </div>
      </nav>
      <div className="container flex flex-col-reverse sm:flex-row items-center px-6 mx-auto mt-5 space-y-0">
        <div className="flex flex-col mb-32 space-y-12 sm:w-1/2">
          <h1 className="max-w-sm mt-12 mb-0 text-center text-goldenYellow sm:text-left sm:text-5xl">
            Get inspired and start planning your dream trip today.
          </h1>
          <p className="max-w-sm text-center text-whiteSmoke sm:text-left">
            Discover new cultures, try new foods, and create unforgettable
            memories with <span className={styles.strong}>Wanderer</span>
            .Get out of your comfort zone and make new friends and make your
            travel dreams a reality.
          </p>
          <div className="flex justify-center sm:justify-start">
            <Link to="login" className={styles.link}>
              <Button
                variant="contained"
                className="rounded-lg bg-goldenYellow hover:bg-whiteSmoke hover:text-goldenYellow"
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
