import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/blog/add", {
        ...input,
        user: localStorage.getItem("userId")
      });
      return response.data;
    } catch (err) {
      console.error("Error posting blog:", err.response ? err.response.data : err.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();
      console.log("Blog posted successfully:", data);
      navigate("/myBlogs"); // Navigate to the user's blogs page
    } catch (err) {
      console.error("Failed to post blog:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        Post your Blog
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
      <InputLabel sx={labelStyles}>Image URL</InputLabel>
      <TextField
        name="image"
        onChange={handleChange}
        value={input.image}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning' type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddBlog;
