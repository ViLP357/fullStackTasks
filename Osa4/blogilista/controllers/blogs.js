const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {name: 1, username: 1 })
  response.json(blogs)
})
  
//huom! yksittäisen blogin näyttäjällä ei ole populatea
blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findById(id).then(blog => {
    response.json(blog)
  })
    .catch(error => next(error))
})
blogsRouter.post('/', async (request, response, next) => {

  const { title, url, author, likes } = request.body
  //const user = await User.findById(body.userId)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  //console.log(user.id)
  //console.log(user._id)

    if (!title || !url) {
        return response.status(400).json({ error: 'title and url are required' });
    } 
  try {
    const blog = new Blog({
      title: title,
      author:author,
      url: url,
      likes: likes,
      user: user.id //pitäisikö olla vain .id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id) //tännekin ehkö .id
    await user.save()
    response.status(201).json(savedBlog)
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