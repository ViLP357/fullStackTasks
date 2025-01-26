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
  //console.log(likes)
  suurin =  Math.max(...likes)
  const mostLikedBlogs = blogs.filter(blog => blog.likes === suurin)
  //console.log(mostLikedBlogs)
  return mostLikedBlogs[0]
}
  
module.exports = {
    dummy,
    totalLikes,
    mostLikes
  }