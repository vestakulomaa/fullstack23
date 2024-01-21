import {useState} from 'react'

const Blog = ({ blog, updateLikes }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    updateLikes({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1, 
      user: blog.user
    })
  }

  if(!view) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setView(true)}>View</button>
      </div>  
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setView(false)}>Hide</button></p>
      <p>Likes: {blog.likes} <button onClick={addLike}>Like</button></p>
      <p>{blog.url}</p>
      {blog.user.name}
    </div>
  )

  
}

export default Blog