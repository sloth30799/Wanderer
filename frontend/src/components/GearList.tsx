import { useState, FormEvent, SyntheticEvent } from "react"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  IconButton,
} from "@mui/material"
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { useEffect } from "react"
import { GearCategory, GearType, ItemType } from "../types"
import { useUpdateGearMutation } from "../api/gearApiSlice"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { updateBackpackingContent } from "../services/features/profile/profileSlice"

type OneItemProps = {
  item: ItemType
  category: GearCategory
  checkGear: (
    e: SyntheticEvent<Element, Event>,
    category: GearCategory,
    id: string
  ) => void
  removeGear: (category: GearCategory, id: string) => void
}

type AddItemProps = {
  category: GearCategory
  addGear: (e: FormEvent<HTMLFormElement>) => void
}

type GearDisplayProps = {
  gearData: GearType
}

const styles = {
  listsBox: `w-full p-3 flex flex-col gap-3 border-solid border rounded-lg`,
  listTitle: `font-title text-lg text-deepBlue text-center underline underline-offset-2`,
}

const OneItem = ({ item, category, checkGear, removeGear }: OneItemProps) => {
  const { name, completed } = item

  return (
    <FormGroup className="flex flex-row justify-between">
      <FormControlLabel
        control={<Checkbox color="secondary" size="small" />}
        label={name}
        onChange={(e: SyntheticEvent<Element, Event>) =>
          checkGear(e, category, item.name)
        }
        checked={completed}
      />
      <IconButton
        onClick={() => removeGear(category, item.name)}
        aria-label="delete"
        color="inherit"
        size="small"
      >
        <RemoveCircleOutlineIcon className="text-sm" />
      </IconButton>
    </FormGroup>
  )
}

const AddItem = ({ category, addGear }: AddItemProps) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    addGear(event)
    setOpen(false)
  }

  return (
    <main className="flex justify-center">
      {open ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <TextField variant="standard" label="Gear" name={`${category}`} />
          <Button variant="contained" color="secondary" type="submit">
            Add
          </Button>
        </form>
      ) : (
        <Button variant="contained" onClick={handleClickOpen} color="secondary">
          Add {category}
        </Button>
      )}
    </main>
  )
}

const GearList = ({ gearData }: GearDisplayProps) => {
  const dispatch = useDispatch()
  const [gear, setGear] = useState(gearData)
  const { equipments, accessories, essentials } = gear
  const [updateGearList, { isSuccess }] = useUpdateGearMutation()

  useEffect(() => {
    setGear(gearData)
  }, [gearData])

  // actions
  function addGear(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    let category: GearCategory = "accessories"
    let item = ""

    for (const pair of formData.entries()) {
      category = pair[0] as GearCategory
      item = pair[1] as string
    }

    const itemList = gear[category]

    setGear((prevGear) => {
      return {
        ...prevGear,
        [category]: [
          ...itemList,
          {
            name: item,
            completed: false,
          },
        ],
      }
    })
  }

  function checkGear(
    e: SyntheticEvent<Element, Event>,
    category: GearCategory,
    name: string
  ) {
    const checkbox = e.target as HTMLInputElement
    const itemStatus = checkbox.checked
    const itemList = gear[category]

    const newList = itemList.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          completed: itemStatus,
        }
      }
      return item
    })

    setGear((prevGear) => {
      return { ...prevGear, [category]: newList }
    })
  }

  function removeGear(category: GearCategory, name: string) {
    const itemList = gear[category]

    const filteredList = itemList.filter((item: ItemType) => item.name !== name)

    setGear((prevGear) => {
      return {
        ...prevGear,
        [category]: filteredList,
      }
    })
  }

  function resetGear() {
    setGear((prevGear) => {
      return {
        ...prevGear,
        equipments: [],
        essentials: [],
        accessories: [],
      }
    })
  }

  async function updateGear() {
    await updateGearList({ gear })
    dispatch(updateBackpackingContent({ category: "gears", content: gear }))
    if (isSuccess) toast.success("Updated!")
  }

  return (
    <main className="flex flex-col gap-1">
      <h3 className="text-center my-0 mt-3">Gear List</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center">
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Equipments</h2>
          {equipments &&
            equipments.map((item) => {
              return (
                <OneItem
                  key={item.name}
                  item={item}
                  category={"equipments"}
                  checkGear={checkGear}
                  removeGear={removeGear}
                />
              )
            })}
          <AddItem category={"equipments"} addGear={addGear} />
        </div>
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Accessories</h2>
          {accessories &&
            accessories.map((item) => {
              return (
                <OneItem
                  key={item.name}
                  item={item}
                  category={"accessories"}
                  checkGear={checkGear}
                  removeGear={removeGear}
                />
              )
            })}
          <AddItem category={"accessories"} addGear={addGear} />
        </div>
        <div className={styles.listsBox}>
          <h2 className={styles.listTitle}>Essentials</h2>
          {essentials &&
            essentials.map((item) => {
              return (
                <OneItem
                  key={item.name}
                  item={item}
                  category={"essentials"}
                  checkGear={checkGear}
                  removeGear={removeGear}
                />
              )
            })}
          <AddItem category={"essentials"} addGear={addGear} />
        </div>
      </div>
      <div className="flex flex-row gap-3 mt-3 place-self-end mr-6">
        <Button
          variant="text"
          startIcon={<SettingsBackupRestoreIcon />}
          color="error"
          className="hover:bg-red hover:text-white"
          onClick={resetGear}
        >
          Remove All
        </Button>
        <Button variant="contained" color="secondary" onClick={updateGear}>
          Save
        </Button>
      </div>
    </main>
  )
}

export default GearList
