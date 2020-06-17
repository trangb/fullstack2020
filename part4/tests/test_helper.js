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
const initialUsers = [
  {
    username: 'stuart',
    name: 'Stuart Little',
    passwordHash: 'pazzword'
  },
  {
    username: 'kelly',
    name: 'Kelly Little',
    passwordHash: 'spazzword'
  },
  {
    username: 'warren',
    name: 'Warren Little',
    passwordHash: 'lzspazzword'
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