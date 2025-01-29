const { test, after, beforeEach } = require('node:test')
const assert = require("node:assert")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper.test.js')

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

test.only("blogs have id not _id", async () => {
  const response = await api.get("/api/blogs")
  //console.log(response)
  response.body.map(blog => 
    //console.log(_.has(blog, "id")),
    assert.strictEqual(_.has(blog, 'id'), true)
    // loytyy =  _.has(dependsOn, id)
  )
})

after(async () => {
  await mongoose.connection.close()
})