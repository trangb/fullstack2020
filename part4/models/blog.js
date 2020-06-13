const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: function() {return !(this.url)}
  },
  author: String,
  url: {
    type: String,
    required: function() { return !(this.title) }
  },

  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    if (!returnedObject.likes) {
      returnedObject.likes = 0
    }
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

