const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    //console.log(blogs.length)
    if (blogs.length === 0) {
        return 0
    }
    else {
      const summa = 0
      const result = blogs.reduce( (s, value) => s +  value.likes, summa)
      //onsole.log("tulos", result)
      return result
    }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const likes = blogs.map(blog => blog.likes)
  suurin =  Math.max(...likes)
  const mostLikedBlogs = blogs.filter(blog => blog.likes === suurin)
  return mostLikedBlogs[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const authors = blogs.map(blog => blog.author)
  let numberOfAuthor = _.countBy(authors)
  console.log(numberOfAuthor)
  //console.log(Math.max())
  var suurinMaara = 0
  var suurinAuthor = {}
  for (var key in numberOfAuthor) {
    if (numberOfAuthor[key] >= suurinMaara) {
      suurinMaara = numberOfAuthor[key]
      suurinAuthor = key
    }
  }
  console.log(suurinAuthor, suurinMaara)
  
  return {"author": suurinAuthor, "blogs": suurinMaara}
}
 
module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs
  }