import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate=useNavigate()

  useEffect(()=>{
   if(user?.role!=="Admin")
   {
    navigate("/")
   }
  },[user])
  console.log('User',user)
    
  return (
    <div className="h-[75vh] hidden md:flex ">
      <aside className="min-h-full bg-white w-full max-w-60 shadow-md">
        <div className="  text-center bg-[#F08804]  p-3">
          <h2 className=" text-[20px] font-semibold ">
           Name : {user?.name}
          </h2>
          <p className="font-medium">Role : {user?.role}</p>

        </div>
        <div>
          <nav className="grid">
          <Link to={"all-users"} className="px-7 p-2 border  bg-slate-300 hover:bg-slate-400">All Users</Link>
          <Link to={"all-products"} className="px-7 p-2 border bg-slate-300 hover:bg-slate-400">Products</Link>
          </nav>
       
        </div>
      </aside>
      <main className="w-full h-full">
      <Outlet/>
      </main>
      
    </div>
  );
};

export default Admin;
