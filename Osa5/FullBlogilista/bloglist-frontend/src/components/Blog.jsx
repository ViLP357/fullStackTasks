import { useState, useEffect } from "react"
const Blog = ({ blog, users, likeBlog, deleteBlog, userWithToken }) => {
  const [visible, setVisible ] = useState(false)
  const [user, setUser ] = useState(null)

  useEffect(() => {
    if (!blog?.user?.id || users.length === 0) return

    const foundUser = users.find(u => u.id === blog.user.id)
    setUser(foundUser || null)
  }, [blog.user.id, users])

  const blogStyle = {
    padding: 10,
    border: "solid",
    width: 400,
    borderWidth: 2,
    margin: 5
  }

  const TitlePart = () => {
    if (!visible) {
      return (
        <div>
        {blog.title} <button onClick={({ target }) => setVisible(!visible)}>{visible ? "close" : "view"}</button>
        </div>
      )
    }
  else {
    return (
      <div>
      {blog.title} {blog.author} <button onClick={({ target }) => setVisible(!visible)}>{visible ? "close" : "view"}</button>
      </div>
    )
  }
  }

  const fullView = () => {
    if (userWithToken.username === user.username) {
      console.log("oikea", blog.title)
    }
    else {
      console.log("wrong", blog.title)
    }

    return (
      <div>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
        <p>{user? user.name : "loading"}</p>
        {userWithToken.username === user.username && <button onClick={() => deleteBlog(blog)}>delete</button>}
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        <TitlePart/>
        {visible && fullView()}
      </div>  
    </div>
  )
}

export default Blog