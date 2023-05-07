const Destinations = () => {
  return (
    <div className="container m-auto bg-brightOrange lg:px-6 py-6 my-12 grid gap-3 md:grid-cols-2">
      <div className="flex flex-col md:gap-1">
        <span className="capitalize tracking-tight text-white text-2xl md:text-3xl lg:text-4xl font-title font-extrabold">
          Effortless planning
        </span>
        <span className="capitalize tracking-tight text-white text-2xl md:text-3xl lg:text-4xl font-title font-extrabold">
          Dynamic adventures
        </span>
        <span className="capitalize tracking-tight text-white text-2xl md:text-3xl lg:text-4xl font-title font-extrabold">
          Ultimate exploration
        </span>
        <span className="capitalize tracking-tight text-white text-2xl md:text-3xl lg:text-4xl font-title font-extrabold">
          Connected journeys
        </span>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-2">
        <img
          src="/imgs/4.jpg"
          alt=""
          className="row-span-2 w-full  aspect-1/2"
        />
        <img
          src="/imgs/1.jpg"
          alt=""
          className="row-span-1 w-full  aspect-square"
        />
        <img
          src="/imgs/3.jpg"
          alt=""
          className="row-span-1 w-full  aspect-square"
        />
        <img
          src="/imgs/9.jpg"
          alt=""
          className="row-span-2 w-full  aspect-1/2"
        />
        <img
          src="/imgs/8.jpg"
          alt=""
          className="row-span-2 w-full  aspect-1/2"
        />
        <img
          src="/imgs/6.jpg"
          alt=""
          className="row-span-1 w-full  aspect-square"
        />
      </div>
    </div>
  )
}

export default Destinations
