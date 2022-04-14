import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogItem = ({ blog }) => {

  return (
  <tr>
    <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
    <td>{blog.author}</td>
  </tr> 
  )
}

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogItem