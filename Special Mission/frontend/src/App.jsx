import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="add" element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
