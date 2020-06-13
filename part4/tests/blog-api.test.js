const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

test('api - blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('api - id is defined', async() => {
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