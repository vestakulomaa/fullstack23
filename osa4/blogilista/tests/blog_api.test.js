const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [  
    {    
        _id: "6574b2029ef5ecf8105762e4",
        title: "Test Blog",
        author: "A. Uthor",
        url: "www.testblog.c",
        likes: 20,
        __v: 0  
    },  
    {    
        _id: "6574b26b9ef5ecf8105762e7",
        title: "Blog Blog",
        author: "B. Log",
        url: "www.blogblog.c",
        likes: 40,
        __v: 0  
    },
    {
        _id: "6574bc05a946e03799404a2a",
        title: "Third Blog",
        author: "B. Log",
        url: "www.blog3.c",
        likes: 40,
        __v: 0
    }
]

beforeEach(async () => {  
    await Blog.deleteMany({})  
    let blogObject = new Blog(initialBlogs[0])  
    await blogObject.save()  
    blogObject = new Blog(initialBlogs[1])  
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field is returned as "id"', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())

})

test('post new blog and test that the total grows by one', async () => {
    const new_blog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(new_blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length+1)
    
})

test('post new blog but dont give it any like', async () => {
    const new_blog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(new_blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[initialBlogs.length].likes).toBe(0)
})

test('post new blog but dont give it title', async () => {
    const new_blog = {
        _id: "5a422a851b54a676234d17f7",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 10,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(new_blog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('post new blog but dont give it url', async () => {
    const new_blog = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        likes: 10,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(new_blog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})


test('deleted one blog', async () => {
    const blog_to_delete = initialBlogs[2]
    await api
        .delete(`/api/blogs/${blog_to_delete._id}`)
        .expect(204)
    
    console.log("after deleting")
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length-1)
})

test('update blog likes', async() => {
    const update = {
        _id: "6574b2029ef5ecf8105762e4",
        title: "Test Blog",
        author: "A. Uthor",
        url: "www.testblog.c",
        likes: 30,
        __v: 0
    }

    const id = update._id
    await api.put(`/api/blogs/${id}`, update)
    
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(30)
})

afterAll(async () => {
  await mongoose.connection.close()
})