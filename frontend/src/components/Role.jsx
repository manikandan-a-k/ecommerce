import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import axios from "axios"
import { toast } from 'react-toastify';
axios.defaults.withCredentials=true
const Role = ({
    name,
    email,
    role,
    onClose,
    userId,
    callFun
}) => {
    const [userRole,setUserRole]=useState(role)
   
    const updateUserRole=async()=>{
      await axios.post("/updateUser",{
        role:userRole,
        userId:userId
      }).
      then(({data})=>{
       if(data.success)
       {
        toast.success(data.message)
        onClose()
        callFun()
       }
      }).
      catch((err)=>{

      })
     
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center h-full  w-full bg-slate-900 bg-opacity-55'>
     <div className='bg-white flex flex-col gap-3 mx-auto shadow-md p-6 w-full max-w-md rounded-md '>
        <button className=' flex ml-auto text-xl hover:bg-red-600' onClick={onClose}><IoMdClose/></button>
       <h2 className='text-xl font-medium'>Change User Role</h2>
       <p>Name : {name}</p>
       <p>Email : {email} </p>
       <div className='flex gap-3   '>
        <p>Role :</p>
        <select className='border border-slate-500 cursor-pointer' value={userRole} onChange={(e)=>setUserRole(e.target.value)}>
            <option value="General">
                General
            </option>
            <option value="Admin">Admin</option>
        </select>
        </div>
        <button  onClick={updateUserRole}className='bg-[#f08804] text-white font-medium w-fit mx-auto block py-2 px-3 mt-3 rounded-md hover:bg-red-400 hover:rounded-full'>Change Role</button>

     </div>
    </div>
  )
}

export default Role
