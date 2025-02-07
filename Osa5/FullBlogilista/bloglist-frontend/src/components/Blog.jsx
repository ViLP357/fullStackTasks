import {useState} from "react"
const Blog = ({ blog, users }) => {
  const [visible, setVisible ] = useState(false)

  const blogStyle = {
    padding: 10,
    border: "solid",
    width: 400,
    borderWidth: 2,
    margin: 5
  }


  const user = users.filter(u => u.id === blog.user.id)
  console.log(user)
  //const user = users.find({})
  //console.log(user.name)

  const fullView = () => {

    return (
      <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes}</p>
      <p>{user[0].name}</p>
    
      </div>
    )
  }
  return (
  <div style={blogStyle}>
    <div>
    {blog.title} {blog.author} <button onClick={({target}) => setVisible(!visible)}>view</button>
    {visible && fullView()}
  </div>  
  </div>
  )
}

export default Blog