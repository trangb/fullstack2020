const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there is initially some blogs saved', () => {
  test('api - blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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

    expect(response.body[0].title).toBe('My First Blog')
  })

})

describe('adding a blog', () => {
  test('api - a valid blog can be added', async () => {
    const newBlog = {
      title: 'My Test Blog',
      author: 'Amanda Huginkiss',
      url: 'http://www.amandahuginkiss.com',
      likes: 11
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain('My Test Blog')
  })
  test('api - likes are defaulted to 0 if missing', async () => {
    const newBlog = {
      title: 'No Likes Blog',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const total = helper.initialBlogs.length + 1
    expect(blogsAtEnd).toHaveLength(total)

    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain('No Likes Blog')

    expect(blogsAtEnd[total - 1].likes).toEqual(0)
  })

  test('api - blog not added if no title and url', async () => {
    const newBlog = {
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  test('api - just no url is ok', async () => {
    const newBlog = {
      title: 'No URL here',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  })

})

describe('deleting a blog', () => {
  test('api - succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

})

afterAll(() => {
  mongoose.connection.close()
})