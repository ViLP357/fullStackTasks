const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', (request, response) => {
    //if (request.body.likes === null || request.body.likes.length === 0) {
      //console.log("fail null")
      //request.body.likes = 0
      //console.log(request.body)
    //}
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogsRouter