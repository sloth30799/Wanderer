import bestPlace from "../../assets/best-place.svg"
import camping from "../../assets/camping.svg"
import floatingBalloon from "../../assets/floating-balloon.svg"
import explore from "../../assets/explore.svg"
import offRoad from "../../assets/off-road.svg"
import adventure from "../../assets/adventure.svg"

const Travel = () => {
  return (
    <div className="py-12 px-3 grid grid-cols-3 gap-y-12 md:grid-cols-6 gap-3 justify-items-center">
      <img src={adventure} alt="image" className="h-12 md:h-16" />
      <img src={explore} alt="image" className="h-12 md:h-16" />
      <img src={offRoad} alt="image" className="h-12 md:h-16" />
      <img src={floatingBalloon} alt="image" className="h-12 md:h-16" />
      <img src={camping} alt="image" className="h-12 md:h-16" />
      <img src={bestPlace} alt="image" className="h-12 md:h-16" />
    </div>
  )
}

export default Travel
