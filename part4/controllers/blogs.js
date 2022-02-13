const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog ? response.json(blog) : response.status(404).end()
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const { title, author, url } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else
    response.status(401).json({ error: 'you cannot delete this blog' })

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    ...body,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(result)
})

module.exports = blogsRouter