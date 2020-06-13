const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}