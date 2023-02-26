export function addItem(gear, gearType, item) {
  const itemList = gear[gearType]
  const newGear = {
    ...gear,
    [gearType]: [
      ...itemList,
      {
        name: item,
        completed: false,
      },
    ],
  }
  return newGear
}

export function checkItem(gear, gearType, itemStatus, name) {
  const itemList = gear[gearType]
  const newList = itemList.map((item) => {
    if (item.name === name) {
      return {
        ...item,
        completed: itemStatus,
      }
    }
    return item
  })

  const newGear = {
    ...gear,
    [gearType]: newList,
  }

  return newGear
}

export function removeItem(gear, gearType, name) {
  const itemList = gear[gearType]
  const filteredList = itemList.filter((item) => item.name !== name)
  const newGear = { ...gear, [gearType]: filteredList }
  return newGear
}

export function resetItems(gear) {
  const newGear = { ...gear, equipments: [], essentials: [], accessories: [] }
  return newGear
}
