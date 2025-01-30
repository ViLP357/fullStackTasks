const { test, after, beforeEach, describe } = require('node:test')
const assert = require("node:assert")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper.js')

const Blog = require('../models/blog')
const _ = require('lodash');
const { errorHandler } = require('../utils/middleware.js')
const sinon = require("sinon")
const { expect } = require("chai")

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})
describe('Initially saved notes and data validation', () => {
 
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
})

describe("Tests about post", () => {
  test("blogs can be post into /api/blogs", async () => {
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

  test("likes null is 0", async () => {
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

  test('blogi ilman titlea ja url:ia ei mene läpi', async () => {
      let req = {}
      let res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      } 
      let next = sinon.stub()

      const testBlog =  {
        author: "Testitestaaja",
        likes: 5
        //url: "n",
        //title: "notre"
      }
      try {
        //await invalidBlog.validate(); 
        const invalidBlog = new Blog(testBlog)
        await api
          .post('/api/blogs')
          .send(invalidBlog.toObject())

          .expect(400)
        //.expect("Content-Type", /application\/json/)
        //const errorInfo = 0
        console.log("succees")
        //expect(response.status).to.be.equal(400)
      } catch (error) {

        errorHandler(error, req, res, next)
        //console.log((res.status.calledWith(400)).to.be.true)
        //console.log("er: ")
        expect(res.status.calledWith(400)).to.be.true
        //assert.strictEqual(res.status.calledWith(400).to.be.true, true)
      }
  })
})

describe("Tests about delete and put", () => {
  test("delete works", async () => {
    const blogsAtBeginning = await helper.blogsInDb()
    const blogToDelete = blogsAtBeginning[0]
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtTheEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtTheEnd.length, blogsAtBeginning.length -1)
    const contents = blogsAtTheEnd.map(r => r.content)
    assert(!contents.includes(blogToDelete.title))
  })

  test.only("put works", async () => {
    
    const blogsAtBeginning = await helper.blogsInDb()
    const updatedBlog = {
      author: "Edsger W. Dijkstra",
      title: "Go To Statement Considered Harmful",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes:8,
      id: "5a422aa71b54a676234d17f8"
    }

    const blogToUpdate =  await Blog.findById(updatedBlog.id)
    //console.log("id:", updatedBlog.id)
    const response = await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)
    .expect(200)

    const blogsAtTheEnd = await helper.blogsInDb()
    assert(!blogsAtTheEnd.includes(blogToUpdate))
    assert.strictEqual(blogsAtTheEnd.length, blogsAtBeginning.length)
  })
})
after(async () => {
  await mongoose.connection.close()
})