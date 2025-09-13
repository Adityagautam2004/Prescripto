import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import {AdminContext} from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { aToken , setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout= () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    navigate("/");
    toast.success("Logout Successful");
  }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-[#5F6FFF] text-sm text-white px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar