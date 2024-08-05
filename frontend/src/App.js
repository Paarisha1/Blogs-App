import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          { !isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
