import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {

  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }
  const deleteVisible = { display: blog.user.username === user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button style={hideWhenVisible} onClick={() => setInfoVisible(true)}>view</button>
      <button style={showWhenVisible} onClick={() => setInfoVisible(false)}>hide</button>
      <div className='info' style={showWhenVisible}>
        {blog.url}<br></br>
        {blog.likes}<button onClick={() => likeBlog(blog)}>like</button><br></br>
        {blog.user.username}<br></br>
        <button style={deleteVisible} onClick={() => removeBlog(blog)}>delete</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog