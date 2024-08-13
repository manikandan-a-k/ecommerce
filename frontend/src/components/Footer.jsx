import React from "react";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <div className=" bg-[#fafbfc] text-slate-300 w-full ">
      <div className="p-4 mx-auto w-ful container  text-slate-200">
        <div className="flex justify-between">
          <div>
            <h2 className=" font-medium text-black mb-1 text-[12px] md:text-[18px] uppercase">Online Shopping</h2>
            <p className="text-[#696B67] text-[10px] md:text-[12px] md:w-[350px]"><b>100% ORIGINAL</b> gurantee for all products at www.funmarket.com</p>
            
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="  font-medium text-black uppercase mb-1 text-[12px] md:text-[18px]">Social</h2>
            <div className="">
             <ul className="flex  gap-2 cursor-pointer text-[#696B67] text-[10px] md:text-[12px]">
              <Link to={"https://www.instagram.com/"} className=""><FaInstagram/></Link>
              <Link to={"https://x.com/?lang=en"} className=""><BsTwitterX/></Link>
              <Link to={"https://www.facebook.com/"} className=""><FaFacebook/></Link>
              
             </ul>
            </div>
          </div>
        </div>

        <div className="flex mt-2 md:my-5 items-center text-[10px] md:text-[12px] justify-center text-[#282c3f] gap-1">
          <p>&copy;</p>
          <p>www.funmarket.com. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
