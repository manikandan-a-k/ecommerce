import React, { useContext, useEffect, useRef, useState } from "react";
import currencyConveter from "../Helper/currencyConveter";
import { Link } from "react-router-dom";
import addToCart from "../Helper/addToCart";
import scrollTop from "../Helper/scrollTop";
import Context from "../context";

const DisplayProducts = ({ loading, data = [] }) => {
  const loadingList = new Array(12).fill(null);
  const { countAddToCartProducts } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    countAddToCartProducts();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4   overflow-x-scroll  products-scrollbar transition-all   md:gap-2 ">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                key={"product" + index}
                className="w-full border   rounded-md min-w-[310px] md:min-w-[300px] max-w-[310px] cursor-pointer md:max-w-[300px] bg-slate-50   "
              >
                <div className=" h-32 md:h-40  animate-pulse flex justify-center items-center min-w-[110px] md:min-w-[130px] bg-slate-200   md:p-1  "></div>
                <div className=" animate-pulse  p-2 md:px-3 md:py-4 w-full  flex flex-col gap-2">
                  <h2 className="text-ellipsis font-medium text-base md:text-lg p-2 bg-slate-200 rounded-full  line-clamp-1 capitalize"></h2>
                  <p className="uppercase p-2 bg-slate-200 rounded-full  text-[11px] md:text-[14px] text-slate-600"></p>
                  <div className="flex gap-2  animate-pulse items-center">
                    <div className="flex w-full items-center p-2 bg-slate-200 rounded-full gap-1 text-[10px] md:text-[11px] ">
                      <p className="line-through w-full bg-slate-200 rounded-full"></p>
                    </div>
                  </div>
                  <div className="py-1 p-2 animate-pulse  bg-slate-200  text-[12px] md:text-[14px] md:py-1 w-full px-5 md:px-5    text-center rounded-3xl">
                    <button className="py-2"></button>
                  </div>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link to={`/product-details/${product?._id}`} key={"product"+product?.productName} onClick={scrollTop} className=" rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-2 my-1  cursor-pointer   ">
              <div className=" w-full h-[140px] flex items-center mx-auto md:h-[190px] md:w-[200px]">
          <img
            src={product.productImage[0]}
            className="object-scale-down mix-blend-multiply p-2 md:p-5 w-full h-full hover:scale-110 "
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
            className="py-1 mx-auto mt-2 text-[12px] text-black md:text-[16px] md:py-2 w-full px-5 md:px-5  rounded  bg-[#ffb800] text-center hover:rounded-full"
          >
            <button>Add to Cart</button>
          </div>
        </div>
            </Link>
            );
          })}
    </div>
  );
};

export default DisplayProducts;
