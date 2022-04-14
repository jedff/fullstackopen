const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  user ? response.json(user) : response.status(404).end()
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(password === undefined) {
    return response.status(400).json( { error: 'User validation failed: password must be given' })
  } else if(password.length < 3) {
    return response.status(400).json({ error: `User validation failed: password: ('${password}') is shorter than the minimum allowed length (3).` })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User ({
    username: username,
    passwordHash,
    name: name
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter