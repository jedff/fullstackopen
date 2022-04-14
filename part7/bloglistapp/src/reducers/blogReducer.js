import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    likeBlog(state, action) {
      const likedBlog = action.payload
      return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const blog = action.payload
      return state.filter((b) => b.id !== blog)
    },
    appendComment(state, action) {
      const commentedBlog  = action.payload
      console.log(commentedBlog)
      return state.map((blog) => (blog.id !== commentedBlog.id ? blog : commentedBlog))
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const { likeBlog, setBlogs, appendBlog, deleteBlog, appendComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (newBlogObj) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newBlogObj)
    dispatch(appendBlog(newBlog))
  }
}
export const removeBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
    }
  }
}
export const likedBlog = (blogObject) => {
  return async (dispatch) => {
    const { user } = blogObject
    const { comments } = blogObject
    const { id } = blogObject
    const { likes } = blogObject
    const likedBlogObj = {
      ...blogObject,
      user: user.id,
      comments: comments.id,
      likes: likes + 1,
    }
    const likedBlog = await blogService.like(id, likedBlogObj)
    likedBlog.user = user
    likedBlog.comments = comments
    dispatch(likeBlog(likedBlog))
  }
}

export const commentedBlog = (blogObject, comment) => {
  return async(dispatch) =>{
    const commentObj = {
      content: comment,
      blog: blogObject.id
    }
    const addedComement = await blogService.comment(blogObject.id, commentObj)
    const newBlogObj = {
      ...blogObject,
      comments: blogObject.comments.concat(addedComement)
    }
    dispatch(appendComment(newBlogObj))
  }
}

export default blogSlice.reducer