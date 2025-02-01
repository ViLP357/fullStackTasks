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

const bcrypt = require('bcryptjs')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})
describe('Initially saved blogs and data validation', () => {
 
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

  test("put works", async () => {
    
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

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    let req = {}
      let res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      } 
      let next = sinon.stub()

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
    try {
      console.log("Starting test...");
      
      await api.post('/api/users').send(newUser).expect(400);

      console.log("Test failed (should not reach here)");
  } catch (error) {
      console.log("Error caught:", error);
      errorHandler(error, req, res, next);

      const usersAtEnd = await helper.usersInDb();  // Käyttäjät, ei blogit
      console.log("Response status calls:", res.status.args);

      expect(res.status.calledWith(400)).to.be.true;
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(res.includes("User validation failed: username: Path `username`")) //pitäsikö ehlä olla res.json tai joku muu viittaus error messageen
  }
  })

  test.only("cannot create user with username less than 3 characters", async () => {
    let req = {}
    let res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } 
    let next = sinon.stub()

  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'ml',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }
  try {
    console.log("Starting test...");
    
    await api.post('/api/users').send(newUser).expect(400);
  } catch (error) {
      console.log("Error caught:", error);
      errorHandler(error, req, res, next);
      const usersAtEnd = await helper.usersInDb();  // Käyttäjät, ei blogit
      console.log("Response status calls:", res.status.args);

      expect(res.status.calledWith(400)).to.be.true;
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
      assert(res.includes("expected `password` to be 3 characters or longer"))
  }
  })
})


after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})