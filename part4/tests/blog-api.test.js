const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('api - blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('api - a valid blog can be added', async () => {
  console.log('starting test')
  const newBlog = {
    title: 'My Test Blog',
    author: 'Amanda Huginkiss',
    url: 'http://www.amandahuginkiss.com',
    likes: 11
  }

  console.log('calling await api')
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  console.log('calling helper to get blogsInDb')
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  console.log('getting blogsAtEnd')
  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'My Test Blog'
  )
})

test('api - id is defined', async () => {
  const response = await api.get('/api/blogs')
  const blog = new Blog(response)
  expect(blog.id).toBeDefined()
})


test('api - there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('api - the first blog I just added', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('A blog I just made')
})

afterAll(() => {
  mongoose.connection.close()
})