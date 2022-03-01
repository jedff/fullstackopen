import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (evt) => {
    evt.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    createBlog(newBlog)
    setTitle('')
    setUrl('')
    setAuthor('')

  }

  return (
    <div>
      <h2>Add blog</h2>
      <form onSubmit={addBlog} style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }}>
        <input placeholder='Title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}></input>
        <input placeholder='Author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
        <input placeholder='URL' type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input>
        <button id='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default BlogForm