import { useState } from 'react'
import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (evt) => {
    evt.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    props.createBlog(newBlog)
    props.setNotification({status: 'success', msg: `new blog '${newBlog.title}' added`})
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Add blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Control
            placeholder="Title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            autoFocus
          ></Form.Control>
          <Form.Control
            placeholder="Author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></Form.Control>
          <Form.Control
            placeholder="URL"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></Form.Control>
          <Button variant="primary" id="add-btn" type='submit'>Add</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect(
  null, 
  { createBlog, setNotification }
)(BlogForm)