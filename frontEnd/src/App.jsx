import React from 'react'
import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import BlogHome from './pages/BlogHome'
import BlogDetails from './pages/BlogDetails'


const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/bloghome' element={<BlogHome/>}/>
      <Route path='/blogpost/:slug' element={<BlogDetails/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App