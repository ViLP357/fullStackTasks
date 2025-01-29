const { test, after, beforeEach } = require('node:test')
const assert = require("node:assert")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper.test.js')

const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test.only('right amount of blogs is returned', async () => {
    const response = await api.get("/api/blogs")
    //console.log(response.body)
    //.expect("Content-Type", /application\/json/)
   // assert.strictEqual(response, application/json)
    //response.expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, 2)
})
test.only("blogs are returned as json", async () => {
  await api
  .get("/api/blogs")
  .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})