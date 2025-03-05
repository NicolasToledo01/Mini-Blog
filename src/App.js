import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

//hooks

import { useState, useEffect, use } from 'react';
import { useAuthentication } from './hooks/UseAuthentication';

//context

import { AuthProvider } from './context/authContext';

import Home from "./pages/home/Home"
import About from "./pages/about/about"
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Dashboard from "./pages/dashboard/dashboard";
import CreatePost from './pages/createPost/CreatePost';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, [auth])

  if (loadingUser) {
    return <p>carregando..</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/Login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/Register' element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path='/Dashboard' element={user ? <Dashboard /> : <Navigate to="Login" />} />
              <Route path='/posts/Create' element={user ? <CreatePost /> : <Navigate to="Login" />} />


            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
