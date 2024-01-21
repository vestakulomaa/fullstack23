import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  /*const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')*/
  const [notifMessage, setNotif] = useState(null)
  const [errorMessage, setError] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)


  useEffect(() => { 
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    console.log("see if someone logged in")
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Login failed')
      console.log("login failed")
      setTimeout(() => {
        setError(null)
      }, 4000)
    }
  }

  /*const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log("new blog")
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0, 
      user: user
    }

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setNotif(`${title} added!`)
    setTimeout(() => {
      setNotif(null) 
    }, 4000)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogFormVisible(false)
  }*/

  const Notif = ({message}) => {
    if(message === null) {
      return null
    }
    return (
      <div className="notif">{message}</div>
    )
  }

  const Error = ({message}) => {
    if(message === null) {
      return null
    }
    return (
      <div className="error">{message}</div>
    )
  }

  const addBlog =  (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))})
    console.log("addBlog in App")
    setNotif(`New blog added!`)
    setTimeout(() => {
      setNotif(null)
    }, 4000)
    setBlogFormVisible(false)
  }

  const updateLikes = (blogObject) => {
    console.log("like clicked")
    const id = blogObject.id
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>

      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>Add blog</button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm
          user={user}
          createBlog={addBlog}
        />
        <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
      </div>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notif message={notifMessage}/>
        <Error message={errorMessage}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
                type="text"
                value={username}
                name="username"
                onChange={({target}) => setUsername(target.value)}
                />
          </div>
          <div>
            password
              <input
                type="password"
                value={password}
                name="password"
                onChange={({target}) => setPassword(target.value)}
                />
          </div>
          <button type="submit">Login</button>
        </form>
        </div>
      )
    }

  return (
    <div>
      <Notif message={notifMessage}/>
      <Error message={errorMessage}/>
      <h2>Blogs</h2>
      <p>{user.name} is logged in </p> 
      <p><button onClick={logOut} type="submit">Log out</button></p>
      {blogs.filter(blog => blog.user.username == user.username).map(blog => 
        <div>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes}/>
        </div>
         )}
      {blogForm()}
    </div>

  )
}

export default App