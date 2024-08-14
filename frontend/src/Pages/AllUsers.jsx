import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import moment from "moment"
import { MdModeEdit } from "react-icons/md";
import Role from '../components/Role';
axios.defaults.withCredentials = true;
const AllUsers = () => {
  const [allUsers,setAllUsers]=useState([])
  const [updateOpen,setUpdateOpen]=useState(false)
  const [userDetails,setUserDetails]=useState({
    email:"",
    name:"",
    role:"",
    _id:""
  })

const fetchallUsers=async()=>{
  await axios.get("api/allUsers").then(({data})=>{
    if(data.success)
    {
      setAllUsers(data.data)
      console.log(allUsers)
    }

  }).catch((err)=>{
      toast.error(err)
  })
}
const onClose=()=>{
  setUpdateOpen(false)
}

  useEffect(()=>{
    fetchallUsers()
  },[])
     
  return (
    <div className='h-[65vh]  w-full'>
      <table className='w-full userTable'>
        <thead className='bg-slate-300'>
          <th>S.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
        </thead>
        <tbody>
         {
          allUsers.map((data,i)=>{
           return(
            <tr>
              <td>{i+1}</td>
              <td>{data?.name}</td>
              <td>{data?.email}</td>
              <td>{data?.role}</td>
              <td>{moment(data?.createdAt).format("lll")}</td>
              <td className='hover:bg-red-400 cursor-pointer'>
                <button className='w-full' onClick={
                  ()=>{
                    setUserDetails(data)
                    setUpdateOpen(true)
                    
                  }
                 

                }>Edit</button>
              </td>

            </tr>
           )
          })
         }
        </tbody>
        
      </table>
      {
        updateOpen&&(<Role onClose={onClose} 
          name={userDetails.name} 
          email={userDetails.email} 
          role={userDetails.role} 
          userId={userDetails._id}
          callFun={fetchallUsers}
          />)
      }
      
    </div>
  )
}

export default AllUsers
