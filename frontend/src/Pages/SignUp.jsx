import React, { useState } from 'react'
import loginIcon from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from '../Helper/ImageToBase64';
import ApiRequests from '../ApiRequests';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  
  //useNavigate
  const navigate=useNavigate()
 const data={
  name:name,
  email:email,
  password:password,
  confirmPassword:confirmPassword
 }

  
 const handleName=(e)=>{
  setName(e.target.value)
}
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handlePass=(e)=>{
    setPassword(e.target.value)
  }
  const handleConfirmPass=(e)=>{
    setConfirmPassword(e.target.value)
  }
 
  const handlePasswordVisible = () => {
    setShowPassword(!showPassword);
  };
 const handleConfirmPasswordVisible=()=>{
  setShowConfirmPassword(!showConfirmPassword)
 }
  const handleSubmit=async(e)=>{
      e.preventDefault()
      if(data.password==data.confirmPassword)
      {
        const dataReq=await fetch(ApiRequests.signUp.url,{
          method:ApiRequests.signUp.method,
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
        const dataRes=await dataReq.json()
        if(dataRes.success)
        {
          toast.success(dataRes.message)
          //After User Created Successfully Navigate To Login Page
          navigate("/login")

        }
        if(dataRes.error)
        {
          toast.error(dataRes.message)
        }
      }else{
        toast.error("Check Your Password and Confirm Password")
       
      }
      
  }
  return (
    <section id="signup">
    <div className="mx-auto container p-4 ">
      <div className="w-full max-w-64 p-4 md:max-w-80 md:px-6 md:py-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white mx-auto rounded-md ">
        <div className=" mb-3 rounded-full  relative mx-auto " >
        <div className="w-12 h-12 mx-auto md:w-16 md:h-16">
            <img src={loginIcon} alt="Login" className="rounded-full " />
          </div>
          
          
          
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 w-full">
            <label className="text-[#424553] text-[14px] md:text-base">Name:</label>
            <input

              type="text"
              name="name"
              required
              placeholder="Enter Your Name"
              onChange={handleName}
              value={name}
              className="bg-[#f5f5f6]  py-[6px]  md:py-[9px] px-[10px] w-full rounded pl-2 text-sm focus-visible:outline-blue-100 "
            ></input>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[#424553] text-[14px] md:text-base">Email:</label>
            <input

              type="email"
              name="email"
              required
              placeholder="Enter Your Email"
              onChange={handleEmail}
              value={email}
              className=" bg-[#f5f5f6] w-full py-[6px]  md:py-[9px] px-[10px] rounded pl-2 text-sm focus-visible:outline-blue-100 "
            ></input>
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-[#424553] text-[14px] md:text-base">Password:</label>
            <div className="flex relative items-center justify-between">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handlePass}
                value={password}
                required
                name="password"
                placeholder="Enter Your Password"
                className="bg-[#f5f5f6] w-full py-[6px]  md:py-[9px] px-[10px]  rounded pl-2 text-sm focus-visible:outline-blue-100  "
              ></input>
              <div
                className="px-[9px] absolute right-0 cursor-pointer text-[16px]"
                onClick={handlePasswordVisible}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-[#424553] text-[14px] md:text-base">Confirm Password:</label>
            <div className=" relative flex items-center justify-between">
              <input
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleConfirmPass}
                value={confirmPassword}
                name="password"
                required
                placeholder="Enter Your Password"
                className=" bg-[#f5f5f6] w-full py-[6px]  md:py-[9px] px-[10px]  rounded pl-2 text-sm focus-visible:outline-blue-100  "
              ></input>
              <div
                className="px-[9px] absolute right-0 cursor-pointer text-[16px]"
               onClick={handleConfirmPasswordVisible}
              >
                {
                  showConfirmPassword? <FaEye /> : <FaEyeSlash />
                }
                
              </div>
            </div>
          </div>
          

          <button style={{ transition: "2s" }} className="text-white mt-2 bg-[#ff3f67] py-[4px] rounded-[3px] text-center font-medium border md:px-4 md:py-2 lg:px-6 hover:bg-white hover:border-[#ff3f67] hover:text-black">
            Sign Up{" "}
          </button>
        </form>
      
      </div>
    </div>
  </section>
  )
}

export default SignUp
