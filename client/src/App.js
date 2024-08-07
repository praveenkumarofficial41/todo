import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Taskbar from './components/Taskbar';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Taskbar/>}></Route>
    </Routes>  
  </BrowserRouter>
  
  
  </>
}

export default App;
