import React, { useState } from 'react'; // Import React and useState hook for state management
import { useDispatch, useSelector } from 'react-redux'; // Import hooks to interact with Redux store
import { AppBar, Button, Toolbar, Typography, Box, Tab, Tabs } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom'; // Import Link component for navigation
import { authActions } from '../store'; // Import authentication actions from the Redux store

const Header = () => {
  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Retrieve login status from the Redux store
  const [value, setValue] = useState(); // State for managing the value of Tabs component

  return (
    <AppBar position='sticky' sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,59,145,1) 35%, rgba(0,212,255,1) 100%)" }}>
      {/* AppBar component from Material-UI with a sticky position and gradient background */}
      <Toolbar>
        {/* Toolbar component to contain the elements in the AppBar */}
        <Typography variant="h4">BlogsApp</Typography>
        {/* Typography component to display the title of the app */}
        <Box display="flex" marginLeft="auto" marginRight="auto">
          {/* Box component for flex layout, centering the Tabs component */}
          {isLoggedIn && (
            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
              {/* Tabs component to display navigation tabs when the user is logged in */}
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              {/* Tab component linking to the "All Blogs" page */}
              <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
              {/* Tab component linking to the "My Blogs" page */}
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
              
                          </Tabs>
          )}
        </Box>
        <Box display="flex" marginLeft="auto">
          {/* Box component for flex layout, aligning buttons to the right */}
          {!isLoggedIn && (
            <>
              {/* Render login and signup buttons if the user is not logged in */}
              <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ marginRight: "1rem", borderRadius: "10px" }} color="warning">
                Login
              </Button>
              <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ marginRight: "1rem", borderRadius: "10px" }} color="warning">
                SignUp
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to="/auth" variant="contained" sx={{ borderRadius: "10px" }} color="warning">
              LogOut
            </Button>
          )}
          {/* Render logout button if the user is logged in */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;



// The Header component creates a navigation bar at the top of the page using Material-UI components. It dynamically adjusts the displayed content based on the user's authentication status, showing different navigation options and buttons for logged-in and logged-out users.

// Components and Functions
// Imports:

// React and useState: React is necessary for building the component, and useState is used for managing the state of the Tabs component.
// useDispatch and useSelector: These hooks from react-redux are used to interact with the Redux store. useDispatch dispatches actions, and useSelector selects data from the store.
// Material-UI components: These provide a set of styled components for building the user interface (AppBar, Button, Toolbar, Typography, Box, Tab, Tabs).
// Link: This component from react-router-dom allows for navigation between different routes in the application.
// authActions: Actions related to authentication are imported from the Redux store.
// Header Component:

// useDispatch: Initializes the dispatch function for dispatching Redux actions.
// useSelector: Retrieves the isLoggedIn state from the Redux store to determine if the user is logged in or not.
// useState: Manages the state of the Tabs component, storing the currently selected tab.
// AppBar:

// Creates a sticky navigation bar with a gradient background.
// Toolbar:

// Contains and aligns the elements within the AppBar.
// Typography:

// Displays the title of the app ("BlogsApp").
// Tabs and Tab Components:

// Only displayed if the user is logged in (isLoggedIn).
// Tabs: Displays navigation tabs for "All Blogs" and "My Blogs".
// Tab: Each tab links to a different route (/blogs and /myblogs).
// Buttons:

// Login and SignUp Buttons: Displayed if the user is not logged in. These buttons link to the authentication page (/auth).
// LogOut Button: Displayed if the user is logged in. This button dispatches the logout action from the Redux store and links to the authentication page.
// Detailed Behavior
// Conditional Rendering: The component conditionally renders different elements based on the isLoggedIn state.

// If isLoggedIn is true:
// The Tabs component is rendered with links to "All Blogs" and "My Blogs".
// The "LogOut" button is rendered. When clicked, it dispatches the logout action to the Redux store, logging the user out.
// If isLoggedIn is false:
// The "Login" and "SignUp" buttons are rendered. These buttons link to the authentication page where users can log in or sign up.
// Styling and Layout:

// The AppBar has a sticky position and a gradient background.
// The Toolbar arranges the elements horizontally.
// The Box components are used to arrange the Tabs and buttons, with some margins to center the Tabs and align the buttons to the right.
// User Interaction
// Navigation:
// Clicking on the Tabs or buttons will navigate the user to different routes (/blogs, /myblogs, /auth).
// Logout:
// Clicking the "LogOut" button will dispatch the logout action, changing the isLoggedIn state to false and redirecting the user to the authentication page.