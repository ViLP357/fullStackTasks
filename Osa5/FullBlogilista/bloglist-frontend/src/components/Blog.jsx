import {useState, useEffect} from "react"
const Blog = ({ blog, users, likeBlog }) => {
  const [visible, setVisible ] = useState(false)
  const [user, setUser ] = useState(null)

  useEffect(() => {
    if (!blog?.user?.id || users.length === 0) return
  
    //console.log("Checking user update...");
    //console.log("Looking for user with ID:", blog.user.id);
    const foundUser = users.find(u => u.id === blog.user.id)
    
    setUser(foundUser || null);
    //console.log("User found:", foundUser);
  }, [blog.user.id, users])

  
  

  const blogStyle = {
    padding: 10,
    border: "solid",
    width: 400,
    borderWidth: 2,
    margin: 5
  }

  //console.log(blog.user)
  //console.log(users)
  //const user = users.filter(u => u.id === blog.user.id)
  //console.log("user: ", user)
  const fullView = () => {
  //if (user.length > 0)
    return (
      <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
      <p>{user? user.name : "loading"}</p>
    
      </div>
    )
  }
  return (
  <div style={blogStyle}>
    <div>
    {blog.title} {blog.author} <button onClick={({target}) => setVisible(!visible)}>{visible ? "close" : "view"}</button>
    {visible && fullView()}
  </div>  
  </div>
  )
}

export default Blog