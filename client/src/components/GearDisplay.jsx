import React, { useState } from "react"
import { useOutletContext } from "react-router-dom"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
} from "@mui/material"
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  addItem,
  checkItem,
  removeItem,
  resetItems,
} from "../utils/gearFunctions"
import { putGear } from "../api/api"
import { useEffect } from "react"

const styles = {
  listsBox: `flex flex-col items-center rounded-lg p-3 gap-3 md:shadow-xl md:border-2 md:border-solid md:border-black md:w-1/3`,
  listTitle: `text-tealBlue`,
}

const OneItem = ({ item, gearType, checkGear, removeGear }) => {
  const { name, completed } = item

  return (
    <FormGroup className="flex w-full flex-row justify-between">
      <FormControlLabel
        control={<Checkbox className="text-black" />}
        label={name}
        onChange={(e) => checkGear(e, name, gearType)}
        checked={completed}
      />
      <IconButton
        onClick={() => removeGear(name, gearType)}
        aria-label="delete"
        className="text-black "
      >
        <DeleteIcon />
      </IconButton>
    </FormGroup>
  )
}

const AddItem = ({ gearType, addGear }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <main>
      <Button
        variant="outlined"
        className="text-brightGreen border-brightGreen"
        onClick={handleClickOpen}
      >
        Add {gearType}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add {gearType}</DialogTitle>
        <DialogContent>
          <form onSubmit={addGear} className="flex flex-col gap-3 p-1">
            <TextField variant="standard" label="Gear" name={`${gearType}`} />
            <Button
              variant="outlined"
              className="text-brightGreen border-brightGreen"
              type="submit"
            >
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}

const GearDisplay = ({ gearData }) => {
  const { displayMessage } = useOutletContext()
  const [gear, setGear] = useState(gearData)
  const { equipments, accessories, essentials } = gear

  useEffect(() => {
    setGear(gearData)
  }, [gearData])

  // actions
  async function addGear(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const keys = [...formData.keys()]
    const gearType = keys[0]
    const item = formData.get(gearType)

    const newGear = await addItem(gear, gearType, item)
    setGear(newGear)
  }

  async function checkGear(e, name, gearType) {
    const itemStatus = await e.target.checked
    const newGear = await checkItem(gear, gearType, itemStatus, name)
    setGear(newGear)
  }

  async function removeGear(name, gearType) {
    const newGear = await removeItem(gear, gearType, name)
    setGear(newGear)
  }

  async function resetGear() {
    const newGear = await resetItems(gear)
    setGear(newGear)
  }

  async function updateGear() {
    const data = await putGear(gear._id, gear)
    if (data.messages) displayMessage(data.messages)
  }

  const equipmentsLists = equipments.map((item) => {
    return (
      <OneItem
        key={item.name}
        item={item}
        gearType={"equipments"}
        checkGear={checkGear}
        removeGear={removeGear}
      />
    )
  })

  const accessoriesLists = accessories.map((item) => {
    return (
      <OneItem
        key={item.name}
        item={item}
        gearType={"accessories"}
        checkGear={checkGear}
        removeGear={removeGear}
      />
    )
  })

  const essentialsLists = essentials.map((item) => {
    return (
      <OneItem
        key={item.name}
        item={item}
        gearType={"essentials"}
        checkGear={checkGear}
        removeGear={removeGear}
      />
    )
  })

  return (
    <main className="flex flex-col gap-3 mt-6 m-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Equipments</h2>
          {equipmentsLists}
          <AddItem gearType={"equipments"} gear={gear} addGear={addGear} />
        </div>
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Accessories</h2>
          {accessoriesLists}
          <AddItem gearType={"accessories"} gear={gear} addGear={addGear} />
        </div>
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Essentials</h2>
          {essentialsLists}
          <AddItem gearType={"essentials"} gear={gear} addGear={addGear} />
        </div>
      </div>
      <div className="flex flex-row gap-3 place-self-end mr-6">
        <Button
          variant="standard"
          startIcon={<SettingsBackupRestoreIcon />}
          className="hover:bg-scarletRed hover:text-white"
          onClick={resetGear}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          className="bg-brightGreen w-24"
          onClick={updateGear}
        >
          Save
        </Button>
      </div>
    </main>
  )
}

export default GearDisplay
