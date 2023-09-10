import React, {useState,useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../components/blog-card'

const UserBlog = () => {
  const [blogs,setBlogs] = useState([])  
  
  //get blog posted by user
  const getBlogsPosted = async () => {
    try {
      const id = localStorage.getItem('userId')
      const {data} = await axios.get('/api/v1/blog/get-user-blog/'+id);
      if (data?.success){
        setBlogs(data?.userBlogPosts.blogs)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogsPosted();
  },[])
  console.log(blogs)

  return (
    <div>
      {blogs && blogs.length>0 ? (blogs.map((blog) =>
      <BlogCard
        id={blog._id}
        isUser={true} 
        title={blog.title}
        description={blog.description}
        image={blog.image}
        username={blog.user.username}
        time={blog.createdAt}
      />)) : (<div style={{ display: 'flex', justifyContent: 'center'}}>
            <h2>Lets Create First Blog</h2></div>)
      }
    </div>
  )
}

export default UserBlog