import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from "./services/users"
import loginService from './services/login'
import { set } from 'mongoose'
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={ handleLogin }>
        <div>
          username
          <input 
            type= "text"
            value={ username }
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  //username: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired

}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log("tokenuser", user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users )
    )  
  }, [])
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
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
  const addLike = (blogObject) => {
    const changedBlog = { ...blogObject, likes: blogObject.likes + 1 }
    blogService
    .update(blogObject.id, changedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : { ...returnedBlog }))
      setInfoMessage(
        `Blog ${returnedBlog.title} by ${returnedBlog.author} was liked succesfully`
      )
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } )
    .catch(error => {
      console.log(error)
      setErrorMessage(
        "Blog couldn't be liked"
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  })
}
const deleteBlog = (blogObject) => {
    if (window.confirm("Haluatko varmasti poistaa blogin")) {
    blogService.deleteBlog(blogObject.id, user.token)
    .then(() => {
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setInfoMessage(`Blogin ${blogObject.title} poistaminen onnistui`)
    })
    .catch(error => {
      console.error("Error deleting person:", error)
      alert("Failed to delete person.")
    })
  }
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
const blogView = () => {
  //console.log(users)
  blogs.sort((first, second) => second.likes - first.likes)
  return (
    <div className="blogs">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} users={users} likeBlog={addLike} deleteBlog={deleteBlog} userWithToken={user}/>
      )}
    </div>
  )
}
if (user === null) {
  return (
    <div>
      <Notification message={infoMessage}/>
      <ErrorNotification message={errorMessage}/>
      <LoginForm handleLogin = {handleLogin} setUsername={setUsername} setPassword= { setPassword} username={username} password={password}/>
   </div>
  )
} else {
    return (
      <div>
        <Notification message={infoMessage}/>
        <ErrorNotification message={errorMessage}/>
        <h2>Blogs</h2>
        <h3> {user.name} logged in <button onClick={handleLogOut}>Log out</button> </h3>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
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