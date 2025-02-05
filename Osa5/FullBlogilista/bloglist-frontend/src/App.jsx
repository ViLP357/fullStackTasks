import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

const handleLogin = async (event) => {
  event.preventDefault()
    
  try {
    const user = await loginService.login({
      username, password,
    })
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    //setErrorMessage('wrong credentials')
    //setTimeout(() => {
    //  setErrorMessage(null)
    //}, 5000)
  }
}

  if (user === null) {
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
  } else {
    return (
      <div>
        <h3> {user.name} logged in</h3>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}

export default App