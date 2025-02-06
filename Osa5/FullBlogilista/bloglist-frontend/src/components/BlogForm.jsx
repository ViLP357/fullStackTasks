const BlogForm = ({addBlog, setTitle, title, setAuthor, author, setUrl, url}) => {
    return (
      <div>
  
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            Title: 
            <input 
            type="text"
            value={title}
            name = "title"
            onChange={({target}) => setTitle(target.value)}
            />
          </div>
  
          <div>
            Author: 
            <input 
            type="text"
            value={author}
            name = "author"
            onChange={({target}) => setAuthor(target.value)}
            />
          </div>
  
          <div>
            url: 
            <input 
            type="text"
            value={url}
            name = "url"
            onChange={({target}) => setUrl(target.value)}
            />
          </div>
  
        <button type="submit">Submit</button>
  
        </form>
      </div>
    )
  }
export default BlogForm