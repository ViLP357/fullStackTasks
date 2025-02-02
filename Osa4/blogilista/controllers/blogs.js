const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
const { tokenExtractor } = require('../utils/middleware')

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
blogsRouter.post('/',tokenExtractor, userExtractor, async (request, response, next) => {

  const { title, url, author, likes } = request.body
  //const user = await User.findById(body.userId)
  //tähän middleware
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  //const user = await User.findById(decodedToken.id)
  const userWithToken = request.user
  console.log(userWithToken)
  const user = await  User.findOne( {username: userWithToken.username })

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
    return response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
  })

blogsRouter.delete("/:id", tokenExtractor, userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(400).json({ error: "token needed"})
  }
  const blog = await Blog.findById(request.params.id)

  const userWithToken = request.user
  const user = await  User.findOne( {username: userWithToken.username })

  console.log(decodedToken.id)
  console.log(decodedToken)
  console.log(blog.user)
  console.log(blog.user.id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    ///ja nykyisen kirjautuneen id)
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end() //lisatty return
  } else {
    return response.status(401).json({ error: "Not allowed to delete this blog"})
  }
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