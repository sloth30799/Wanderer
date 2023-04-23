import {
  BackpackerType,
  BackpackerCategory,
  BackpackerData,
  BackpackerDataArray,
} from "../../types"

interface BackpackerState {
  backpacker: BackpackerType
}

type BackpackerAction =
  | { type: "SET_BACKPACKER"; backpacker: BackpackerType }
  | {
      type: "UPDATE_BACKPACKER"
      dataType: BackpackerCategory
      data: BackpackerData
    }
  | { type: "DELETE_BACKPACKER"; dataType: BackpackerCategory; id: string }
  | { type: "EMPTY_BACKPACKER" }

export function backpackerReducer(
  state: BackpackerState,
  action: BackpackerAction
) {
  switch (action.type) {
    case "SET_BACKPACKER": {
      return {
        ...state,
        backpacker: action.backpacker,
      }
    }
    case "UPDATE_BACKPACKER": {
      return {
        ...state,
        backpacker: {
          ...state.backpacker,
          [action.dataType]: [
            ...state.backpacker[action.dataType],
            action.data,
          ],
        },
      }
    }
    // case "DELETE_BACKPACKER": {
    //   const { dataType, id } = action
    //   let newList: BackpackerDataArray
    //   if (dataType === "gears") {
    //     const dataList = state.backpacker[dataType] as GearType[]
    //     newList = dataList.filter((item: GearType) => item._id !== id)
    //   } else if (dataType === "posts") {
    //     const dataList = state.backpacker[dataType] as PostType[]
    //     newList = dataList.filter((item: PostType) => item._id !== id)
    //   } else if (dataType === "trips") {
    //     const dataList = state.backpacker[dataType] as TripType[]
    //     newList = dataList.filter((item: TripType) => item._id !== id)
    //   }
    //   return {
    //     ...state,
    //     backpacker: {
    //       ...state.backpacker,
    //       [action.dataType]: newList,
    //     },
    //   }
    // }
    case "DELETE_BACKPACKER": {
      const { dataType, id } = action
      const dataList = state.backpacker[dataType] as BackpackerDataArray
      const newList = dataList.filter((item: BackpackerData) => item._id !== id)
      return {
        ...state,
        backpacker: {
          ...state.backpacker,
          [dataType]: newList,
        },
      }
    }

    case "EMPTY_BACKPACKER": {
      return {
        ...state,
        backpacker: null,
      }
    }
  }
}
