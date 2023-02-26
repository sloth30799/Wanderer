import React from "react"

const featuresData = [
  {
    title: "Easily plan your journey with existing templates",
    body: "Are you ready to embark on your next backpacking adventure, but not sure where to start? Our backpacker app makes it easy to plan your journey with existing templates.",
  },
  {
    title: "Stay focused on the adventure",
    body: "When you're out on the road, the last thing you want to worry about is keeping track of your items and budget. With our backpacker app, you can stay focused on the adventure and let us handle the tracking for you.",
  },
  {
    title: "Everything you need in one place",
    body: "Stop jumping from one service to another, research and share your experiences and connect with others. Plan your group trips in one place with everyone involved.",
  },
]

const FeaturesBox = ({ id, title, body }) => {
  return (
    <div className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-6 sm:flex-row">
      <div className="rounded-l-full sm:bg-transparent">
        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 text-white rounded-full sm:py-1 bg-goldenYellow">
            {id}
          </div>
          <h3 className="text-base font-bold sm:mb-4 sm:hidden">{title}</h3>
        </div>
      </div>
      <div>
        <h3 className="hidden mb-4 text-lg font-bold sm:block">{title}</h3>
        <p className="">{body}</p>
      </div>
    </div>
  )
}

const Features = () => {
  const featuresBoxes = featuresData.map((data, i) => {
    return (
      <FeaturesBox key={i} id={i + 1} title={data.title} body={data.body} />
    )
  })

  return (
    <section id="features">
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 sm:space-y-0 sm:flex-row">
        <div className="flex flex-col space-y-12 sm:w-1/2">
          <h2 className="max-w-sm text-4xl font-bold text-center sm:text-left">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            What's different about Wanderer?
          </h2>
          <p className="max-w-sm text-center sm:text-left">
            Go on a trip spontaneously, easily plan your own or get item guides
            from our templates.
          </p>
        </div>
        <div className="flex flex-col space-y-8 sm:w-1/2">{featuresBoxes}</div>
      </div>
    </section>
  )
}

export default Features
