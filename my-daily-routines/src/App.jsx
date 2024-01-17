import { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Menu } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material';
// import NavBar from './NavBar.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-blue-400 grid justify-items-center md:grid-cols-1 lg:grid-cols-1'>
        {/* <NavBar /> */}
        <Menu>
          <MenuItem>what</MenuItem>
        </Menu>
        <Close></Close>
        <AiOutlineUser />
        <Link to={'dashboard'}>Dashboard</Link>
        <Link to={'signUp'}>Sign Up</Link>
        <Link to={'auth/register'}>Register</Link>
        <input type="text" name="dashboard" className='form-input w-1/2 rounded-t-md' />
        <input type="text" name="user" className='form-input w-1/2 rounded-b-md' />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
