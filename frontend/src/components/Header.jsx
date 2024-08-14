import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setUserDetails } from "../store/userSlice";
import Logo from "../assets/FUN FMarket.png";
import Context from "../context";
axios.defaults.withCredentials = true;

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user)
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(false);
  const { addToCartCount } = useContext(Context);
  const { countAddToCartProducts } = useContext(Context);
  const searchLocation = useLocation();

  const [search, setSearch] = useState(searchLocation?.search?.split("=")[1]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    axios
      .get("api/userLogout")
      .then(({ data }) => {
        if (data.success) {
          toast.success(data.message);
          dispatch(setUserDetails(null));
          countAddToCartProducts();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleSearchBar = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
    console.log(value);
  };
  return (
    <header
      style={{ boxShadow: "0 4px 12px 0 rgba(0, 0, 0, .05)" }}
      className="h-16 shadow-md bg-[#fff]  sticky top-0 z-50 "
    >
      <div className="container mx-auto  h-full flex items-center px-4  justify-between">
        <Link to={"/"} className="overflow-hidden w-[150px] ">
          <img
            src={Logo}
            className="mix-blend-multiply overflow-hidden  "
          ></img>
        </Link>
        <div className="relative hidden md:block w-full md:max-w-sm lg:max-w-lg">
          <input
            value={search}
            onChange={handleSearchBar}
            type="text"
            placeholder="Search For Products..."
            className="bg-[#f5f5f6] w-full py-[9px] px-[10px] rounded pl-[40px] text-sm focus-visible:outline-blue-100"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-[12px] pointer-events-none text-[#ff3f67] text-lg">
            <GrSearch />
          </div>
        </div>

       

        <div className="flex items-center gap-3 md:gap-3 lg:gap-7">
          <div className="relative  flex justify-center items-center">
            <div
              className="mb-0 cursor-pointer flex items-center gap-2"
              onClick={() => setAdmin((prev) => !prev)}
            >
              <div className="text-[15px] md:text-[18px]">
                <FaRegCircleUser />
              </div>

              <div className="">
                {user?.name ? (
                  <div className="h-full flex flex-col">
                    <p className="text-[8px] lg:text-[10px]">Hello !</p>
                    <h2 className="text-[8px] text-ellipsis line-clamp-1 uppercase lg:text-[12px]">
                      {user?.name}{" "}
                    </h2>{" "}
                  </div>
                ) : (
                  <div>
                    <p className="text-[12px] lg:text-[15px]">Guest</p>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              {admin && user?.role === "Admin" && (
                <div
                  className="text-[#fff] font-semibold rounded-sm  absolute left-0 top-11 h-fit  px-4 py-1 bg-[#ff3f67]"
                  onClick={() => setAdmin((prev) => !prev)}
                >
                  <nav>
                    <Link to={"/admin/all-products"}>Admin</Link>
                  </nav>
                </div>
              )}
            </div>
          </div>
          {user?._id && (
            <Link
              to={"add-to-cart"}
              className="cursor-pointer md:text-[20px] relative"
            >
              <span className="text-[16px] md:text-[24px]">
                <MdOutlineShoppingCart />
              </span>
              <div className="bg-[#ff3f67] text-[10px] flex items-center justify-center font-medium absolute -top-2 -right-2 text-center rounded-full w-4 h-4 md:text-[12px] md:w-5 md:h-5 md:-top-2 md:-right-2 ">
                {user?._id ? <p>{addToCartCount}</p> : <p>0</p>}
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                style={{ transition: "2s" }}
                className="text-[#fff] border  bg-[#ff3f67]   px-2 py-1 rounded-[3px] text-center font-medium md:px-4 md:py-2 hover:bg-white hover:border-[#ff3f67] hover:text-black"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                type="button"
                style={{ transition: "2s" }}
                className="text-white bg-[#ff3f67] px-2 py-2 rounded-[3px] text-center font-medium border md:px-4 md:py-2 lg:px-6 hover:bg-white hover:border-[#ff3f67] hover:text-black"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
