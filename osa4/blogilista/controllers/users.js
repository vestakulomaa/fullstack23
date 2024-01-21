const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {

    if(!request.body.username || !request.body.password) {
        return response.status(401).json({error: 'Username or password missing'})
    }

    if(request.body.username.length < 3 || request.body.password.length < 3) {
        return response.status(401).json({error: 'Username or password too short'})
    }

    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter