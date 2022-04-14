import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from "./notificationReducer";

const initialState = null

const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    }
  }
})

export const { setUser, login, logout } = userSlice.actions

export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const auth = await loginService.checkAuth(user.token)
      if(auth){
        dispatch(setUser(user))
        blogService.setToken(user.token)
      }
    }
  }
}

export const logIn = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch(login(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setNotification({status: 'success', msg: `Welcome ${user.username}`}))
    } catch(err){
      dispatch(setNotification({status: 'danger', msg: 'Wrong user name or password'}))
    }
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch(logout(null))
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }
}

export default userSlice.reducer