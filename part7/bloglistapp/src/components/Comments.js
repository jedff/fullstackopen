import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { commentedBlog } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    dispatch(commentedBlog(blog, comment))
    setComment('')
  }

  return (
    <div className="comments">
      <h3>comments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control 
            type="text"
            placeholder="write ur comment..."
            value={comment}
            onChange={(evt) => setComment(evt.target.value)}>
          </Form.Control>
          <Button variant="primary" type='submit'>comment</Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.map(co => 
          <li key={co.id}>
            {co.content}
          </li>)}
      </ul>
    </div>
  )
}

export default Comments