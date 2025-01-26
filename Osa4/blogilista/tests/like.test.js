const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const oneBlog = [
  {
     _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0}
]

const empty = [

]
describe('Likes', () => {
  
  test("Total likes of many blogs", () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test("Total likes of one blog equeals the likes of that", () => {
    assert.strictEqual(listHelper.totalLikes(oneBlog), 2)
  })
  
  test("Likes of empty list is zero", () => {
    const result = listHelper.totalLikes(empty)
    assert.strictEqual(result, 0)
  })
})

describe("favorite blog", () => {

  test("favorite blog of many blogs", () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })

  test("favorite of one blog", () => {
    assert.deepStrictEqual(listHelper.mostLikes(oneBlog),   {
      _id: "5a422bc61b54a676234d17fc",
     title: "Type wars",
     author: "Robert C. Martin",
     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
     likes: 2,
     __v: 0})
  })

  test("favorite of no-blogs is 0", () => {
    assert.strictEqual(listHelper.mostLikes(empty), 0)
  })

})

describe("most blogs", () => {
  test("most blogs written of many", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test("most blogs written of one", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(oneBlog), {
      author: "Robert C. Martin",
      blogs: 1
    })
  })

  test("most blogs written of none", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(empty), 0)
  })
})

describe("most liked author", () => {
  test("most liked blogs written of many", () => {
    assert.deepStrictEqual(listHelper.mostLikedBlogs(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test("most liked blogs written of one", () => {
    assert.deepStrictEqual(listHelper.mostLikedBlogs(oneBlog), {
      author: "Robert C. Martin",
      likes: 2
    })
  })

  test("most liked blogs written of none", () => {
    assert.deepStrictEqual(listHelper.mostLikedBlogs(empty), 0)
  })
})
//4.7