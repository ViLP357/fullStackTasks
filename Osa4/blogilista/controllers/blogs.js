const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findById(id).then(blog => {
    response.json(blog)
  })
    .catch(error => next(error))
})
blogsRouter.post('/', async (request, response, next) => {
  const { title, url, author, likes } = request.body;
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

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async () => {
  //const body = request.body

  const blog = { author, title, url} = request.body
  Blog.findByIdAndUpdate(request.params.id, blog, {likes: request.params.number, runValidators: true, context: "query"} )
  .then(updatedBlog => {
    response.json(updatedBlog)
  })
  .catch(error => next(error))
  
}
)
module.exports = blogsRouter