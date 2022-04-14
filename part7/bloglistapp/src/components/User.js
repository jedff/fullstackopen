import React from 'react'
import { Link, useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  if (!users) {
    return null
  }
  const user = users.find(user => user.id === id)
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>{user.blogs.map(blog => 
        <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li> 
      )}
      </ul>
    </div>
  )
}

export default User