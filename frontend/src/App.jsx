import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Login from './pages/login'
import Landing from './pages/landing'
import Skills from './pages/skills'
import Contact from './pages/contact'
import Signup from './pages/signup'
import AdminDash from './pages/adminDash'
import Blogs from './pages/blogs'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminSignup" element={<Signup />} />
      <Route path="/posts" element={<AdminDash />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact_me" element={<Contact />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  )
}

export default App
