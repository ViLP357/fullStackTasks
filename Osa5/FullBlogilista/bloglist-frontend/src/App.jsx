import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { set } from 'mongoose'
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
//import Login from './services/login'
//imprt Togglable from '.components/'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = (blogObject) => {
      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setInfoMessage(
          `Blog ${returnedBlog.title} by ${returnedBlog.author} was added succesfully`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      } )
      .catch(error => {
        console.log(error)
        setErrorMessage(
          "Blog couldn't be added"
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
  }

const handleLogin = async (event) => {
  event.preventDefault()
    
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    console.log("log in works")
    setInfoMessage("Log in succesfully!")
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  } catch (exception) {
    console.log("fail with log in")
    //console.log(exception)
    setErrorMessage('wrong password or username')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogOut = async (event) => {
  event.preventDefault()
  window.localStorage.removeItem("loggedBlogappUser")
  setUser(null)
  blogService.setToken("")
  setUsername("")
  setPassword("")
  setInfoMessage("Log out succesfully!")
  setTimeout(() => {
    setInfoMessage(null)
  }, 5000)
}


const loginForm = () => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
          type= "text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
          type="text"
          value={password}
          name="password"
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const blogView = () => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}



if (user === null) {
  return (
    
    <div>

      <Notification message={infoMessage}/>
      <ErrorNotification message={errorMessage}/>
      {loginForm()}
   </div>

  )
} else {
  return (
    <div>
      <Notification message={infoMessage}/>
      <ErrorNotification message={errorMessage}/>
      <h2>Blogs</h2>
      <h3> {user.name} logged in</h3>
      <button onClick={handleLogOut}>Log out</button>
      <Togglable buttonLabel="new blog">
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogView()}
  
  </div>
)
}



}

export default App