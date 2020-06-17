const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

  })

  describe('tests on existing blogs', () => {
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

  describe('updating a blog', () => {
    test('update likes on an existing blog', async () => {
      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]
      const likesAtStart = blogToUpdate.likes
      const likesAtEnd = likesAtStart + 5
      blogToUpdate.likes = likesAtEnd

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[0].likes).toEqual(likesAtEnd)

    })
  })
})

describe('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('get all users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('add a user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'New Uuser',
      password: 'mypassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('add fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'stuart',
      name: 'Existing user',
      password: 'abracadarbbra',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('add fails with proper statuscode and message if username < 3 length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'st',
      name: 'Smol Guy',
      password: 'abracadarbbra',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('add fails with proper statuscode and message if password < 3 length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'stanley',
      name: 'standly gyy',
      password: 'ab',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('add fails with proper statuscode and message if password missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'stanley',
      name: 'standly gyy'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('add fails with proper statuscode and message if username missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'standly gyy',
      password: 'thepassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})