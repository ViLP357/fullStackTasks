const { test, after, beforeEach } = require('node:test')
const assert = require("node:assert")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper.js')

const Blog = require('../models/blog')
const _ = require('lodash');

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test('right amount of blogs is returned', async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, 2)
})
test("blogs are returned as json", async () => {
  await api
  .get("/api/blogs")
  .expect('Content-Type', /application\/json/)
})

test("blogs have id not _id", async () => {
  const response = await api.get("/api/blogs")
  //console.log(response)
  response.body.map(blog => 
    //console.log(_.has(blog, "id")),
    assert.strictEqual(_.has(blog, 'id'), true)
    // loytyy =  _.has(dependsOn, id)
  )
})

test.only("blogs can be post into /api/blogs", async () => {
  const test_blog = new Blog({
    author: "Testitestaaja",
    title: "Testailua",
    likes: 6,  // Varmista, että likes ei ole null
    url: "www.notReady"
  });
  

  await api
  .post('/api/blogs')
  .send(test_blog.toObject())
  .expect(201)
  .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const contents = response.body.map(r => r.title)
  assert(contents.includes("Testailua"))
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test.only("likes null is 0", async () => {
  const test_blog = new Blog( {
    author: "Testitestaaja",
    title: "Testailua",
    likes: null,
    url: "www.notReady"
  })
  await api
  .post('/api/blogs')
  .send(test_blog.toObject())
  .expect(201)
  .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const result = response.body.filter(blog => blog.likes === null)
  //console.log(result)
  assert.strictEqual(result.length, 0)
})

test.only('blogi ilman titlea ja url:ia ei mene läpi', async () => {
  const invalidBlog = {
    author: "Testitestaaja",
    likes: 5
  }

  const response = await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400) // Odotetaan 400 Bad Request -virhe

  expect(response.body.error).toContain('Title is required')
  expect(response.body.error).toContain('URL is required')
})
  // Varmistaa, että virheilmoitus liittyy titleen tai URL:iin);

after(async () => {
  await mongoose.connection.close()
})