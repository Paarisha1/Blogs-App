import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const BlogDetails = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [input, setInput] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
      return res.data;
    } catch (err) {
      console.error('Error fetching blog details:', err);
    }
  };

  useEffect(() => {
    fetchDetails().then(data => {
      if (data) {
        setBlog(data.blog);
        setInput({ title: data.blog.title, description: data.blog.description });
        console.log('Fetched Blog Details:', data.blog); // Log the blog details
      }
    });
  }, [id]);

  const sendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
        title: input.title,
        description: input.description
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.error('Error updating blog details:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input:', input);
    sendRequest().then((data) => {
      if (data) {
        console.log('Updated Blog Details:', data);
      }
    }).then(()=>navigate("/myBlogs/"));
  };

  return (
    <div>
      {input && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,59,145,1) 35%, rgba(0,212,255,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="80%"
          >
            <Typography
              fontWeight="bold"
              padding={3}
              color="black"
              variant="h2"
              textAlign="center"
            >
              Edit your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={input.title}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={input.description}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning' type="submit">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
