import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService  from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccesMsg] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const addBlog = async (newBlog) => {

    try {
      const createdBlog = await blogService.create(newBlog, user.token)
      setBlogs(blogs.concat(createdBlog))
      setSuccesMsg(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setSuccesMsg(null)
      }, 5000)
    }catch(err) {
      setErrorMsg(err.message)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }

  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      await blogService.remove(blog.id, user.token)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }

  }

  const likeBlog = async (blogObject) => {
    const { user } =blogObject
    const { id } = blogObject
    const { likes } = blogObject

    const likedBlogObj = {
      ...blogObject,
      user: blogObject.user.id,
      likes: likes+1
    }

    const likedBlog = await blogService.like(id, likedBlogObj)
    likedBlog.user = user
    setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog))

  }

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
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    }catch (err) {
      console.error('Wrong credentials')
      setErrorMsg('Wrong username or password')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
      setPassword('')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }


  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Log in to application</h2>
        <Notification classname='success' message={successMsg} />
        <Notification classname='error' message={errorMsg} />
        <form onSubmit={handleLogin}>
          <input type='text' placeholder='Username' value={username} onChange={handleUsernameChange}></input>
          <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
          <button id='form-login-btn'>Login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification classname='success' message={successMsg} />
      <Notification classname='error' message={errorMsg} />
      <p><span style={{ fontWeight: 'bold' }}>{user.name}</span> logged-in </p>
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel='Add new blog'>
        <BlogForm createBlog={addBlog} >
        </BlogForm>
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog className='blog' key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

export default App