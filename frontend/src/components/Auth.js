import React, { useState } from 'react'; // Import React and useState hook for state management
import { Box, Button, TextField, Typography } from '@mui/material'; // Import Material-UI components
import axios from 'axios'; // Import axios for making HTTP requests
import { useDispatch } from 'react-redux'; // Import useDispatch hook to interact with Redux store
import { authActions } from '../store'; // Import authentication actions from the Redux store
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Auth = () => {
  const navigate = useNavigate(); // Initialize useNavigate to navigate programmatically
  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions
  const [isSignup, setIsSignup] = useState(false); // State to toggle between signup and login
  const [input, setInputs] = useState({
    name: "", // Input state for the name field
    email: "", // Input state for the email field
    password: "" // Input state for the password field
  });

  // Function to send login or signup request to the backend
  const sendRequest = async (type = "login") => {
    try {
      const response = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: input.name, // Name input data
        email: input.email, // Email input data
        password: input.password // Password input data
      });
      const data = response.data; // Get the response data
      return data; // Return the data
    } catch (err) {
      console.log(err); // Log any error
      return null; // Return null in case of error
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(input); // Log the input state
    if (isSignup) { // If the state is signup
      sendRequest("signup")
        .then(data => {
          if (data) {
            localStorage.setItem("userId", data.user._id); // Fix typo here
            dispatch(authActions.login()); // Dispatch login action
            navigate("/blogs"); // Navigate to blogs page
            console.log(data); // Log the data
          }
        });
    } else { // If the state is login
      sendRequest()
        .then(data => {
          if (data) {
            localStorage.setItem("userId", data.user._id); // Fix typo here
            dispatch(authActions.login()); // Dispatch login action
            navigate("/blogs"); // Navigate to blogs page
            console.log(data); // Log the data
          }
        });
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState, [e.target.name]: e.target.value // Update the input state
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        <Box
          maxWidth={400} // Set maximum width of the box
          display="flex" // Display as flexbox
          flexDirection={"column"} // Flex direction as column
          alignItems={"center"} // Center align items
          justifyContent={"center"} // Center justify content
          boxShadow={"10px 10px 20px #ccc"} // Box shadow styling
          padding={3} // Padding
          margin='auto' // Center the box horizontally
          marginTop={5} // Top margin
          borderRadius={5} // Rounded corners
        >
          <Typography variant="h2" padding={3} textAlign={"center"}> {/* Header text */}
            {isSignup ? "Signup" : "Login"} {/* Display "Signup" or "Login" based on state */}
          </Typography>
          {isSignup && (
            <TextField
              name="name" // Name input field
              onChange={handleChange} // Handle input change
              value={input.name} // Value of name input
              placeholder="Name" // Placeholder text
              margin='normal' // Normal margin
            />
          )}
          <TextField
            name="email" // Email input field
            onChange={handleChange} // Handle input change
            value={input.email} // Value of email input
            type={"email"} // Input type as email
            placeholder="Email" // Placeholder text
            margin='normal' // Normal margin
          />
          <TextField
            name="password" // Password input field
            onChange={handleChange} // Handle input change
            value={input.password} // Value of password input
            type={"password"} // Input type as password
            placeholder="Password" // Placeholder text
            margin='normal' // Normal margin
          />
          <Button
            type='submit' // Button type as submit
            variant='contained' // Contained button variant
            sx={{ borderRadius: 3, marginTop: 3 }} // Styling for the button
            color='warning' // Warning color
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)} // Toggle between signup and login
            sx={{ borderRadius: 3, marginTop: 3 }} // Styling for the button
          >
            Change to {isSignup ? "Login" : "Signup"} {/* Toggle button text */}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth; // Export the Auth component
