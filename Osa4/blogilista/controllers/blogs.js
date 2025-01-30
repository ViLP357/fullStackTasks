const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const { title, url, author, likes } = request.body;

    // Varmistetaan, että title ja url ovat mukana
    if (!title || !url) {
        return response.status(400).json({ error: 'title and url are required' });
    } 
  try {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = blogsRouter