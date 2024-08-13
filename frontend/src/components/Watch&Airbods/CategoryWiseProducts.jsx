import React, { useContext, useEffect, useRef, useState } from "react";
import categoryWiseProducts from "../../Helper/categoryWiseProducts";
import currencyConveter from "../../Helper/currencyConveter";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../../Helper/addToCart";
import Context from "../../context";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { TfiAngleRight } from "react-icons/tfi";



const CategoryWiseProducts = ({ categoryName, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { countAddToCartProducts } = useContext(Context);

  const fetchProducts = async () => {
    const dataResponse = await categoryWiseProducts(categoryName);
    setLoading(false);
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    countAddToCartProducts();
  };
  return (
    <div className="container px-4 mx-auto my-1 md:my-3 relative">
      <h2 className="font-semibold text-[17px] md:text-[25px] text-[#212121] py-5">{heading}</h2>
      <div
        className="flex items-center  gap-3  overflow-scroll  products-scrollbar transition-all   md:gap-6"
        ref={scrollElement}
      >
        <div className="flex items-center ">
          <button
            onClick={scrollLeft}
            className="absolute z-10 hidden text-white md:block left-0 text-[18px] bg-[#ff3f67] p-2 rounded-full hover:scale-125  "
          >
            <LiaAngleLeftSolid />
          </button>
          <button
            onClick={scrollRight}
            className="absolute z-10 hidden md:block text-white   right-0 text-[18px] bg-[#ff3f67] p-2 rounded-full hover:scale-125"
          >
            < TfiAngleRight />
          </button>
        </div>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full border   rounded-md min-w-[310px] md:min-w-[370px] max-w-[310px] cursor-pointer md:max-w-[370px] bg-slate-50 h-40 md:h-44  flex flex-col">
                  <div className="h-full animate-pulse min-w-[110px] md:min-w-[130px] bg-slate-200 "></div>
                  <div className="  p-2 md:px-3 md:py-4 w-full h-full flex flex-col gap-2 md:gap-3">
                    <h2 className="text-ellipsis p-3 rounded-full bg-slate-200 animate-pulse font-medium text-base md:text-lg  line-clamp-1 capitalize"></h2>
                    <p className="uppercase p-3 rounded-full bg-slate-200 animate-pulse  text-[11px] md:text-[14px] text-slate-600"></p>
                    <div className="flex gap-2 p-3 rounded-full bg-slate-200 animate-pulse  items-center">
                      <p className="font-medium text-[18px] text-red-700 md:text-[22px]"></p>
                      <div className="flex items-center gap-1 text-[10px] md:text-[11px] "></div>
                    </div>
                    <div className=" py-3 w-full bg-slate-200 animate-pulse text-[12px] md:text-[14px]   px-5 md:px-5   text-center rounded-3xl"></div>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={`/product-details/${product?._id}`}
                  key={product}
                  className=" rounded cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-2    flex flex-col"
                >
                  <div className=" w-[160px] h-[100px] flex items-center mx-auto md:h-[190px] md:w-[240px]">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down mix-blend-multiply p-1 md:p-5 w-full h-full hover:scale-110 "
                    />
                  </div>
                  <div className="  p-2 md:px-3 md:py-4 w-full h-full flex flex-col gap-1">
                    <h2 className="text-ellipsis text-black font-medium text-[12px] md:text-[17px]  line-clamp-1 capitalize">
                      {product?.productName}
                    </h2>
                    <p className="capitalize  text-[11px] md:text-[14px] text-[#878787]">
                      {product?.catagory}
                    </p>
                    <div className="flex gap-2">
                      <p className="font-medium text-[16px] text-[#212121] md:text-[20px]">
                        {currencyConveter(product?.selling)}
                      </p>
                      <div className="flex items-center text-[#878787] gap-1 text-[10px] md:text-[14px] ">
                        <p className="line-through">
                          {currencyConveter(product?.price)}
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="py-1 mx-auto mt-2 text-[12px] text-black md:text-[14px] md:py-2 w-full px-5 md:px-5  rounded  bg-[#ffb800] text-center hover:rounded-full"
                    >
                      <button>Add to Cart</button>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProducts;
