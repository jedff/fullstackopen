require('dotenv').config()

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const PORT = process.env.PORT
const connectionString = NODE_ENV === 'test'
  ? MONGODB_URI_TEST
  : MONGODB_URI

module.exports = {
  connectionString,
  PORT
}