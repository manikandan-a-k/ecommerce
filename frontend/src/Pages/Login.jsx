import React, { useContext, useState } from "react";
import loginIcon from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ApiRequests from "../ApiRequests";
import { toast } from 'react-toastify';
import Context from "../context";
import axios from "axios"
axios.defaults.withCredentials=true
const Login = () => {
  const navigate=useNavigate()
  const {fetchUser,countAddToCartProducts}=useContext(Context)
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
 const user={
  email:email,
  password:password
 }

  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handlePass=(e)=>{
    setPassword(e.target.value)
  }
 
  const handlePasswordVisible = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit=async(e)=>{
      e.preventDefault()
      const loginReq=await fetch(ApiRequests.signIn.url,{
        method:ApiRequests.signIn.method,
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(user)
      })
      
      const loginRes=await loginReq.json()
      if(loginRes.success)
      {
        toast.success(loginRes.message)
        navigate("/")
        fetchUser()
        countAddToCartProducts()
      }
      if(loginRes.error)
      {
        toast.error(loginRes.message)
      }
  }
  return (
    <section id="login">
      <div className="mx-auto container p-4 ">
        <div className="w-full max-w-64  md:max-w-80 px-4 py-4 md:px-6 md:py-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white mx-auto rounded-md  border border-slate-300">
          <div className="w-12 h-12 mx-auto md:w-16 md:h-16">
            <img src={loginIcon} alt="Login" className="rounded-full " />
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 w-full">
              <label className=" text-[14px] md:text-base text-[#424553]">Email:</label>
              <input

                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleEmail}
                value={email}
                className=" bg-[#f5f5f6] w-full py-[6px] md:py-[9px] md:px-[10px] rounded pl-2 text-sm focus-visible:outline-blue-100 "
              ></input>
            </div>
            <div className="flex flex-col gap-1 w-full ">
              <label className="text-[14px] md:text-base text-[#424553]">Password:</label>
              <div className="relative rounded-md flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handlePass}
                  value={password}
                  name="password"
                  placeholder="Enter Your Password"
                  className=" bg-[#f5f5f6] w-full py-[6px] md:py-[9px] md:px-[10px] rounded pl-2 text-sm focus-visible:outline-blue-100  "
                ></input>
                <div
                  className="px-[9px] absolute right-0 cursor-pointer text-[16px]"
                  onClick={handlePasswordVisible}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <div className="ml-auto text-[14px] md:text-base text-[#ff3f67] hover:underline hover:text-slate-800">
              <Link to={"/forgotpassword"}>Forgot Password ?</Link>
            </div>

            <button style={{ transition: "2s" }} className="text-white bg-[#ff3f67] py-[4px] rounded-[3px] text-center font-medium border md:px-4 md:py-2 lg:px-6 hover:bg-white hover:border-[#ff3f67] hover:text-black">
              Log in{" "}
            </button>
          </form>
          <p className="mt-4 text-[#424553] text-[14px] md:text-base">
            New to Fun Market  ?{" "}
            <Link
              to={"/signup"}
              className=" text-[#ff3f67] hover:underline "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
