const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
    {
        username: 'selena',
        name: 'Sel Ena',
        password: 'pw'
    },
    {
        username: 'minerva',
        name: 'Min Erva',
        password: 'salasana',
    }
]

beforeEach(async () => {  
    await User.deleteMany({})  
    let userObject = new User(initialUsers[0])  
    await userObject.save()  
    userObject = new User(initialUsers[1])  
    await userObject.save()
})

test('creation succeeds with a fresh username', async () => {
    const newUser = {
        username: 'vesta',
        name: 'Ve Sta',
        password: 'shh',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length+1)
})

test('make sure has username', async () => {
    const newUser = {
        name: 'Ve Sta',
        password: 'shh',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
    expect(result.body.error).toContain('Username or password missing')
})

test('make sure has password', async () => {
    const newUser = {
        username: 'vesta',
        name: 'Ve Sta',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
    expect(result.body.error).toContain('Username or password missing')
})

test('test if username at least 3 characters', async () => {
    const newUser = {
        username: 've',
        name: 'Ve Sta',
        password: 'shh',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
    expect(result.body.error).toContain('Username or password too short')
})

test('test if password at least 3 characters', async () => {
    const newUser = {
        username: 'vesta',
        name: 'Ve Sta',
        password: 'sh',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
    expect(result.body.error).toContain('Username or password too short')
})

/*
test('username has to be unique', async () => {
    const newUser = {
        username: 'minerva',
        name: 'Vesta',
        password: 'shh',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
    expect(result.body.error).toContain('Username already in use')
})*/

afterAll(async () => {
    await mongoose.connection.close()
  })