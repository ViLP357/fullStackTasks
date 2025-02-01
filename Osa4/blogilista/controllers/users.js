const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    if (password.length <= 3) {
      return response.status(400).json({ error: "expected `password` to be 3 characters or longer"})
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  } catch(error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1})
  response.json(users)
})

module.exports = usersRouter