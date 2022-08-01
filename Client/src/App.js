import './App.css';
// import Login from './pages/Login/Login'
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LikedSongs from './pages/LikedSongs/LikedSongs';
import Library from './pages/Library/Library';
import Playlist from './pages/Playlist/Playlist';
import Signup from './pages/Login/signup';
import Login1 from './pages/Login/Login1';
import {useAuthContext} from "./hooks/useAuthContext"
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  const {user} = useAuthContext();  
  return (
    <div className="App">
      
      <BrowserRouter>

      <Routes>
      
      {/* <Route path="/" element={<Login />} /> */}
      <Route path='/register' element={<Signup/>} />
      <Route path="/login" element={<Login1 />} />
      <Route path="/reset-password/:email/:token" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search/>} />
      <Route path="/liked" element={user?<LikedSongs/> : <Navigate to="/login" />} />
      <Route path="/library" element={<Library/>} />
      <Route path="/playlist/:id" element={<Playlist/>} />
      
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}
export default App;
