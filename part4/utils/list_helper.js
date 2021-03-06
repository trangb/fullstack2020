const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  //non-functional
  // let sum = 0
  // for (let i = 0; i < blogs.length; i++) {
  //   sum += blogs[i].likes
  // }
  // return sum

  //functional
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  let fav = blogs.reduce((init, item) => {
    if (!init) {
      return item
    } else {
      return (item.likes > init.likes) ? item : init
    }
  }, null)

  return fav === null ? null :
    {
      title: fav.title,
      author: fav.author,
      likes: fav.likes
    }
}

const mostBlogs = (blogs) => {
  let blogCtsByAuthor = _.countBy(blogs, (item) => item.author)

  let most = {
    author: '',
    blogs: 0
  }
  _.forEach(blogCtsByAuthor, (value, key) => {
    if (value > most.blogs) {
      most.blogs = value
      most.author = key
    }
  })
  return (most.blogs === 0) ? null : most
}

const mostLikes = (blogs) => {
  let authors = _.groupBy(blogs, (item) => item.author)

  let most = {
    author: '',
    likes: 0
  }
  _.forEach(authors, (blogList, auth) => {
    let sum = _.sumBy(blogList, (item) => item.likes)
    if (sum > most.likes) {
      most.author = auth
      most.likes = sum
    }
  })
  return (most.likes === 0) ? null : most
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}