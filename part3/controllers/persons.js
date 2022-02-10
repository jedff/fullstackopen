const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (request, response) => {
  Person.countDocuments().then((count_documents) => {
    response.send(`Phonebook has info for ${count_documents} people <br/> ${new Date()}`)})
})

personsRouter.get('/', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(addedPerson => {
    response.status(201).json(addedPerson)
    console.log(`Added ${body.name} number ${body.number} to Phonebook.`)
  })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new : true, runValidators: true })
    .then(result => {
      response.status(404).json(result)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


module.exports = personsRouter