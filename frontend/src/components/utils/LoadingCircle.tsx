import { Box, CircularProgress } from "@mui/material"

const LoadingCircle = () => {
  return (
    <Box className="flex justify-center items-center h-screen">
      <CircularProgress />
    </Box>
  )
}

export default LoadingCircle
