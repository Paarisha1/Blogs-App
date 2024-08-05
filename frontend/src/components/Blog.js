import React from 'react';
import { Avatar, CardContent, CardMedia, Typography, Card, CardHeader, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

const Blog = ({ id, title, description, imageURL, userName, isUser }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/blog/${id}`);
      return res.data;
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const handleDelete = () => {
    deleteRequest().then(() => {
      navigate("/blogs");
    });
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc"
          }
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteOutlineIcon /></IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="user">
              {userName?.[0]}
            </Avatar>
          }
          title={title || "No Title"} // Default value if title is undefined
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL || "default.jpg"} // Default image if imageURL is undefined
          alt={title || "No Image"} // Default alt text if title is undefined
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>{" => "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
