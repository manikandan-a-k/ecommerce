import React, { useContext, useState } from "react";
import loginIcon from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import ApiRequests from "../ApiRequests";
import { toast } from 'react-toastify';

import axios from "axios"
axios.defaults.withCredentials=true
const ForgotPassword = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState("");

 const user={
  email:email
 }

  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handleSubmit=async(e)=>{
      e.preventDefault()
      const forgotReq=await fetch(ApiRequests.forgotPassword.url,{
        method:ApiRequests.forgotPassword.method,
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(user)
      })
      
      const forgotRes=await forgotReq.json()
      console.log(forgotRes)
      if(forgotRes.success)
      {
        toast.success(forgotRes.message)
        navigate("/login")
      }
      if(forgotRes.error)
      {
        toast.error(lforgotRes.message)
      }
  }
  return (
    <section id="forgotpassword">
      <div className="mx-auto container p-4  h-[68vh]">
        <div className="w-full max-w-64 p-4 md:max-w-80 md:px-6 md:py-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white mx-auto rounded-md  border border-slate-300">
          <div className="w-12 h-12 mx-auto md:w-16 md:h-16">
            <img src={loginIcon} alt="Login" className="rounded-full " />
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[#424553] text-[14px] md:text-base">Email:</label>
              <input

                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleEmail}
                value={email}
                className=" bg-[#f5f5f6] w-full py-[6px] md:py-[9px] md:px-[10px] rounded pl-2 text-sm focus-visible:outline-blue-100 "
              ></input>
            </div>
           
           

            <button style={{ transition: "2s" }} className="text-white bg-[#ff3f67] px-2 py-[4px] mt-2 rounded-[3px] text-center font-medium border md:px-4 md:py-2 lg:px-6 hover:bg-white hover:border-[#ff3f67] hover:text-black">
              Submit{" "}
            </button>
          </form>
        
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

