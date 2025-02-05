const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {type: Number,
    set: val => val === null ? 0 : val
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', schema)