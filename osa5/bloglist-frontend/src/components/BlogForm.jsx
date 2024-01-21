import {useState} from 'react'

const BlogForm = ({user, createBlog}) => {
    console.log("in BlogForm")
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        console.log("in addBlog in BlogForm")
        console.log(user)
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: 0, 
            user: user
        })
        console.log("after createBlog")
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>New blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input type="text" value={title} name="title" onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                    Author:
                    <input type="text" value={author} name="author" onChange={({target}) => setAuthor(target.value)} />
                </div>
                <div>
                    Url:
                    <input type="text" value={url} name="url" onChange={({target}) => setUrl(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm