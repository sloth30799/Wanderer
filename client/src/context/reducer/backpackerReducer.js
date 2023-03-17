export function backpackerReducer(state, action) {
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
      const dataList = state.backpacker[action.dataType]
      const newList = dataList.filter((item) => item._id !== action.id)

      return {
        ...state,
        backpacker: {
          ...state.backpacker,
          [action.dataType]: newList,
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
