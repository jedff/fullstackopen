const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.code === 11000){
    return response.status(400).json({ error: `Username '${error.keyValue.username}' already exist` })
  }else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')){
    request.token = auth.substring(7)
  }
  next()
}
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  request.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}