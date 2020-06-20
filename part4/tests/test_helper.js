const Blog = require('../models/blog')
const User = require('../models/user')

// Blog
const initialBlogs = [
  {
    title: 'My First Blog',
    author: 'Arthur Stanley',
    url: 'http://www.iamcool.com',
    likes: 2
  },
  {
    title: 'The Best Blog',
    author: 'Donald Drump',
    url: 'http://www.mega.com',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// User
//user1 password: passwerd, user2 password: passwurd
const initialUsers = [
  {
    username: 'user1',
    name: 'User one',
    passwordHash: '$2b$10$gFcJGF.GfKaSQkSG4CPyhuEHPxyJYX7veymu7lXeflJ5vfEVGosAe'
  },
  {
    username: 'user2',
    name: 'User two',
    passwordHash: '$2b$10$LVTSeUbvDB8rItiFgmKK4OG36z5MaP5wszxZF.hLvvuz5aBHIN8Km'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,
  initialUsers, usersInDb
}