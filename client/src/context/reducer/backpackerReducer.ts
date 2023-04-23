import {
  BackpackingData,
  BackpackingCategory,
  BackpackingContent,
  BackpackingContentList,
} from "../../types"

interface BackpackerState {
  backpacker: BackpackingData
}

type BackpackerAction =
  | { type: "SET_BACKPACKER"; backpacker: BackpackingData }
  | {
      type: "UPDATE_BACKPACKER"
      dataType: BackpackingCategory
      data: BackpackingContent
    }
  | { type: "DELETE_BACKPACKER"; dataType: BackpackingCategory; id: string }
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
    case "DELETE_BACKPACKER": {
      const { dataType, id } = action
      const dataList = state.backpacker[dataType] as BackpackingContentList
      const newList = dataList.filter(
        (item: BackpackingContent) => item._id !== id
      )
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
