import { CircularProgress } from "@mui/material"
import React from "react"

const ProgressSkeleton = ({ progress }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <CircularProgress variant="buffer" value={progress} />
    </div>
  )
}

export default ProgressSkeleton
