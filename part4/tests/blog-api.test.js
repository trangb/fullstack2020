const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('api - blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
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