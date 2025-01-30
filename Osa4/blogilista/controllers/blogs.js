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
  const { title, url, author, likes } = request.body
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

blogsRouter.put("/:id", async (request, response) => {
  //const body = request.body
  //console.log(request.body)
  //console.log(request.params)
  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url,
    id: body.id
  }

  try {
    const blogToUpdate = await Blog.findById(body.id)
    if (!blogToUpdate) {
      console.log("Not found here 4")
      return response.status(404).json({ error: "Blog not found täällä 2" })
    }
    console.log("jatketaan")

    const updatedBlog = await Blog.findByIdAndUpdate(body.id, blog, { new: true })
    console.log(updatedBlog)
    if (updatedBlog) {
      response.status(200).json(updatedBlog)  // Käytä 200, koska tämä on päivitys
    } else {
      console.log("404 fail täällä")
      response.status(404).json({ error: "Blog not found" })
    }
  } catch (error) {
    next(error)
  }
  
}
)
module.exports = blogsRouter