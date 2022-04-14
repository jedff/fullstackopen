const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).populate('comments')
  blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const { title, author, url } = request.body

  const user = await User.findById(request.user)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: 0,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {

  const user = await User.findById(request.user)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id.toString())
    await user.save()
    await Comment.deleteMany({ blog: request.params.id })
    response.status(204).end()
  }else
    response.status(401).json({ error: 'you cannot delete this blog' })

})


blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  console.log(blog)
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(result)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content,
    blog: blog._id
  })

  const savedComment = await comment.save()
  response.status(201).json(savedComment)
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

})

module.exports = blogsRouter