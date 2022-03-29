import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createdFilter(state, action) {
      const content = action.payload
      return state = content
    }
  }
})

export const { createdFilter } = filterSlice.actions
export default filterSlice.reducer