import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('render blog title and author only', () => {
  const blog = {
    title: 'Blog 0',
    author: 'Admin',
    url: 'http: //blog.cleancoder.com',
    likes: 15,
    user: 'root',
  }

  const user = {
    username: 'root',
  }

  const mockRemoveBlogHandler = jest.fn()
  const mockLikeBlogHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      removeBlog={mockRemoveBlogHandler}
      likeBlog={mockLikeBlogHandler}
    />
  )
  const element = container.querySelector('.info')

  expect(element.style).toHaveProperty('display', 'none')
})

test('clicking the button shows blog url and likes', async () => {
  const blog = {
    title: 'Blog 0',
    author: 'Admin',
    url: 'http: //blog.cleancoder.com',
    likes: 15,
    user: 'root',
  }

  const user = {
    username: 'root',
  }

  const mockRemoveBlogHandler = jest.fn()
  const mockLikeBlogHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      removeBlog={mockRemoveBlogHandler}
      likeBlog={mockLikeBlogHandler}
    />
  )
  const element = container.querySelector('.info')

  const button = screen.getByText('view')
  userEvent.click(button)

  expect(element.style).toHaveProperty('display', '')
})

test('like button is cliked twice', async () => {
  const blog = {
    title: 'Blog 0',
    author: 'Admin',
    url: 'http: //blog.cleancoder.com',
    likes: 15,
    user: 'root',
  }

  const user = {
    username: 'root',
  }
  const mockRemoveBlogHandler = jest.fn()
  const mockLikeBlogHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      user={user}
      removeBlog={mockRemoveBlogHandler}
      likeBlog={mockLikeBlogHandler}
    />
  )

  const button = screen.getByText('like')
  userEvent.click(button)
  userEvent.click(button)

  expect(mockLikeBlogHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputURL = screen.getByPlaceholderText('URL')
  const addButton = screen.getByText('Add')

  userEvent.type(inputTitle, 'Blog 0')
  userEvent.type(inputAuthor, 'Admin')
  userEvent.type(inputURL, 'http: //blog.cleancoder.com')
  userEvent.click(addButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Blog 0',
    author: 'Admin',
    url: 'http: //blog.cleancoder.com',
  })
})
