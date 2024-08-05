import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blog');
      setBlogs(res.data.blogs)
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to fetch blogs');
      return [];
    }
  };

  useEffect(() => {
    sendRequest()
  }, []);
  console.log(blogs)
  return (
    <div>
      {blogs && blogs?.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem('userId') === blog.user?._id}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user?.name} // Use optional chaining to avoid undefined errors
        />
      ))}
    </div>
   
  );
};

export default Blogs;
