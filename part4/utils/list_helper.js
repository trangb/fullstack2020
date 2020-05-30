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
module.exports = {
  dummy, totalLikes, favoriteBlog
}