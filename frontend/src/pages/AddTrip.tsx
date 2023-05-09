import {
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAddTripMutation } from "../api/tripApiSlice"
import { Link } from "react-router-dom"
import { addBackpackingContent } from "../services/features/profile/profileSlice"
import { toast } from "react-hot-toast"

const styles = {
  label: `font-bold font-title text-brightOrange`,
  costLabel: `font-title text-sm text-deepBlue`,
}

const AddTrip = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createTrip, { isLoading }] = useAddTripMutation()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const { data }: any = await createTrip(formData)

      if (data.success === false) toast.error("Something went Wrong!")

      if (data.trip) {
        dispatch(
          addBackpackingContent({ category: "trips", content: data.trip })
        )
        dispatch(
          addBackpackingContent({ category: "gears", content: data.trip.gear })
        )
        navigate(`/trip/${data.trip._id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container m-auto">
      <Link
        to="/profile/trip"
        relative="path"
        className="no-underline text-black"
      >
        &larr; <span className="text-xs">Back</span>
      </Link>
      <h1 className="font-title text-xl text-deepBlue font-extrabold">
        Start Your Adventure
      </h1>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <TextField
          variant="standard"
          id="destination"
          name="destination"
          label="Destination"
          required
        />
        <FormControl>
          <FormLabel
            className={styles.label}
            htmlFor="outlined-adornment-amount"
          >
            Start Date
          </FormLabel>
          <OutlinedInput
            type="date"
            id="startDate"
            name="startDate"
            label="Start Date"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel
            className={styles.label}
            htmlFor="outlined-adornment-amount"
          >
            End Date
          </FormLabel>
          <OutlinedInput
            type="date"
            id="endDate"
            name="endDate"
            label="End Date"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel
            className={styles.label}
            htmlFor="outlined-adornment-amount"
          >
            Budget
          </FormLabel>
          <OutlinedInput
            type="number"
            id="budget"
            name="budget"
            label="Amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl className="flex flex-col gap-2">
          <FormLabel className={styles.label}>Accommodations</FormLabel>
          <TextField
            variant="outlined"
            id="name"
            name="accommodationName"
            label="Name"
            fullWidth
          />
          <OutlinedInput
            type="number"
            id="cost"
            name="accommodationCost"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
        </FormControl>
        <FormControl className="flex flex-col gap-3">
          <FormLabel className={styles.label}>Transportation</FormLabel>
          <TextField
            variant="outlined"
            id="name"
            name="transportationName"
            label="Name"
            fullWidth
          />
          <OutlinedInput
            type="number"
            id="cost"
            name="transportationCost"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth
          />
        </FormControl>
        <TextField
          id="note"
          name="note"
          label="Add some notes"
          multiline
          rows={4}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Exploring" : "Explore further"}
        </Button>
      </form>
    </div>
  )
}

export default AddTrip
