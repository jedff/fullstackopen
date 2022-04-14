const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

loginRouter.get('/', tokenExtractor, userExtractor, async (request, response) => {
  response.json('true')
})

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username : username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({ error: 'invalid user name or password' })
  }

  const userForToken = {
    user: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60*24 })

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter