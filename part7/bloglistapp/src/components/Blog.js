import React from 'react'
import { useDispatch } from 'react-redux'
import { likedBlog, removeBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, signedUser }) => {
  const dispatch = useDispatch()
 
  if (!blog) {
    return null
  }
  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url} target="_blank" rel='noreferrer'>{blog.url}</a>
      <div className='bloglikes'>
      {blog.likes}
      <Button variant="primary" onClick={() => dispatch(likedBlog(blog))}>like</Button>
      </div>
      <p>Added by {blog.user.username}</p>
      <Button
        variant="primary" 
        style={{ display: blog.user.username === signedUser.username ? '' : 'none' }} 
        onClick={() => dispatch(removeBlog(blog))}
      >
        delete
      </Button>
      <Comments blog={blog}></Comments>
    </div>
  )
}

export default Blog
