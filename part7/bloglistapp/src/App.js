import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser, logIn, logOut } from './reducers/userReducer'
import { Routes, Route, useMatch, Navigate } from "react-router-dom"
import usersService from './services/users'
import './App.css'
import BlogList from './components/BlogList'
import Navigation from './components/Navigation'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const signedUser = useSelector(state => state.user)
  const [users, setUsers] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const matchBlog = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const getUsers = async () => {
      const users = await usersService.getAll()
      setUsers(users)
    }
    getUsers()
  }, [])


  const blog = matchBlog 
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null
 
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value)
  }

  const handleLogin = async (evt) => {
    evt.preventDefault()
    console.log('logging in with', username, password)
    try {
      dispatch(logIn({
        username,
        password,
      }))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error('Wrong credentials')
      setPassword('')
      dispatch(setNotification({status: 'error', msg: 'Wrong user name or password'}))
    }
  }

  const handleLogout = () => {
    dispatch(logOut())
  }

  if (signedUser === null) {
    return (
      <div className="container">
        <Navigation handleLogout={handleLogout} signedUser={signedUser}></Navigation>
        <h1>Blog app</h1>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            ></Form.Control>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            ></Form.Control>
            <Button variant="primary" id="form-login-btn" type='submit'>Login</Button>
          </Form.Group>
        </Form>
        <Footer>
        <em>Note app, Department of Computer Science 2022</em>
      </Footer>
      </div>
    )
  }
  return (
    <div className="container">
      <Navigation handleLogout={handleLogout} signedUser={signedUser}></Navigation>
      <h1>Blog app</h1>
      <Notification />
      <Routes>
        <Route path="/users" element={<UserList users={users}></UserList>}></Route>
        <Route path='/users/:id' element={<User users={users}></User>}></Route>
        <Route path='/blogs' element={<BlogList blogs={blogs}></BlogList>}></Route>
        <Route path='/blogs/:id' element={blog ? <Blog blog={blog} signedUser={signedUser}></Blog>
                                                : <Navigate replace to="/blogs" />}>
        </Route>
        <Route exact path="/" element={<BlogList blogs={blogs}></BlogList>} />
      </Routes>
      <Footer>
        <em>Bloglist app, Full Stack open 2022</em>
      </Footer>
    </div>
  )
}

const Footer = styled.div`
text-align: center;
background: #d9f9fa;
padding: 1em;
margin-top: 1em;
font-size: 1rem
`

export default App
