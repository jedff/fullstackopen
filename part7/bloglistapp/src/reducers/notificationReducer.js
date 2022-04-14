import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeOut = undefined

const notificationSlice = createSlice ({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload 
    }
  }
})

export const { notification } = notificationSlice.actions

export const setNotification = (content) => {
  return dispatch => {
    dispatch(notification(content))
    if(typeof timeOut === 'number')
      clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      dispatch(notification(null))
    }, 5000);
  }
}

export default notificationSlice.reducer