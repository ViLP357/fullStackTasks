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
    const changedBlog = {...blogObject, likes: blogObject.likes + 1}

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
  //console.log(users)
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} users={users} likeBlog={addLike}/>
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