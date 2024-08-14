import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import INRConverter from "../Helper/currencyConveter";
import RecommendedProducts from "../components/RecommendedProducts";
import addToCart from "../Helper/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [showZoomImage, setShowZoomImage] = useState(false);
  const { countAddToCartProducts } = useContext(Context);
  const [zoomImage, setZoomImage] = useState({
    x: 0,
    y: 0,
  });

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    catagory: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const productLoadingList = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    await axios
      .post("/api/product-details", {
        productId,
      })
      .then(({ data }) => {
        setLoading(true);
        setData(data?.data);
        setLoading(false);
        setActiveImage(data?.data.productImage[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id)
    countAddToCartProducts()

  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);
  const handleMouseOver = (imageURL) => {
    setActiveImage(imageURL);
  };
  const handleZoomImage = useCallback((e) => {
    setShowZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImage({ x, y });
  },[zoomImage]);
  const handleZoomOut = () => {
    setShowZoomImage(false);
  };
  console.log(data.catagory)

  return (
    <div className="container mx-auto p-4 ">
      <div className=" min-h-[200px] gap-4 flex flex-col lg:flex-row">

        {/* Product Image */}
        <div className="flex flex-col  gap-4 lg:flex-row-reverse">
          {loading ? (
            <div className="h-[300px] animate-pulse rounded-md w-full lg:h-96 lg:w-96 bg-slate-200"></div>
          ) : (
            <div className=" relative cursor-pointer p-2  h-[300px] rounded-md w-full lg:h-96 lg:w-96 bg-slate-200">
              <img
                src={activeImage}
                className="w-full h-full object-scale-down mix-blend-multiply p-2"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleZoomOut}
              />
              {showZoomImage && (
                <div className=" hidden md:block overflow-hidden absolute top-0 -right-[510px] min-w-[500px] min-h-[400px] bg-slate-200">
                  <div
                    className="h-full object-center p-10 scale-125    w-full min-w-[500px] min-h-[400px] mix-blend-multiply"
                    style={{
                      backgroundRepeat: "no-repeat",
                      transition: "backgroundPosition 0.1s",
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomImage.x * 100}% ${
                        zoomImage.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex lg:flex-col overflow-scroll products-scrollbar">
                {productLoadingList.map((el, i) => {
                  return (
                    <div
                      className=" animate-pulse h-20 w-20 bg-slate-200 rounded"
                      key={"loading"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex lg:flex-col rounded-sm overflow-scroll products-scrollbar">
                {data?.productImage?.map((imageURL, i) => {
                  return (
                    <div
                      className="h-20 w-20 rounded-md bg-slate-200 "
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        onMouseOver={() => handleMouseOver(imageURL)}
                        onClick={() => handleMouseOver(imageURL)}
                        alt="Image"
                        className=" cursor-pointer rounded-md w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        {loading ? (
          <div className="flex flex-col gap-1 md:gap-2 mt-2 md:mt-0">
            <p className="border animate-pulse rounded-md px-4 bg-slate-300 p-2 w-fit"></p>
            <h2 className="bg-slate-300 p-2 animate-pulse w-[200px] rounded-md capitalize font-medium text-slate-800 text-ellipsis line-clamp-1 text-[20px] md:text-4xl"></h2>
            <p className="uppercase text-slate-600 p-2 w-[100px] rounded-md bg-slate-300 animate-pulse "></p>
            <div className="flex items-center  gap-2">
              <p className="text-red-600 p-2 bg-slate-300 rounded-md animate-pulse w-[200px] font-medium text-[25px]  md:text-4xl"></p>
              <div className="flex text-[14px] md:text-base items-center gap-1 text-slate-600">
                <p></p>
                <p className="line-through"></p>
              </div>
            </div>
            <div className="flex gap-2 animate-pulse  md:mt-2 ">
              <button className=" min-w-[120px] p-3 bg-slate-300 hover:rounded-full  py-3 px-7 rounded-sm"></button>
              <button className="min-w-[120px] p-3 bg-slate-300 text-white  hover:rounded-full py-3 px-5 rounded-sm"></button>
            </div>
            <div className="mt-1">
              <h2 className="font-semibold text-[20px] rounded-md animate-pulse bg-slate-300 p-3 w-[120px]"></h2>
              <p className="text-slate-700 bg-slate-300 w-[200px] md:w-[400px] h-32 rounded-md animate-pulse mt-1 text-ellipsis  line-clamp-3 md:line-clamp-5"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 md:gap-2 mt-2 md:mt-0">
            <p className="border rounded-sm px-4 border-slate-400 w-fit">
              {data?.brandName}
            </p>
            <h2 className=" capitalize font-medium text-slate-800 text-ellipsis line-clamp-1 text-[20px] md:text-4xl">
              {data?.productName}
            </h2>
            <p className="uppercase text-slate-600 ">{data?.catagory}</p>
            <div className="flex items-center  gap-2">
              <p className="text-red-600 font-medium text-[25px]  md:text-4xl">
                {INRConverter(data?.selling)}
              </p>
              <div className="flex text-[14px] md:text-base items-center gap-1 text-slate-600">
                <p>M.R.P</p>
                <p className="line-through">{INRConverter(data?.price)}</p>
              </div>
            </div>
            <div className="flex gap-2  md:mt-2 ">
              <button className="border min-w-[120px] border-red-400 hover:rounded-full  py-1 px-7 rounded-sm">
                Buy Now
              </button>
             
            </div>
            <div className="mt-1">
            <h2 className="font-semibold text-[17px] md:text-[25px] text-[#212121] py-1">Description :</h2>
              <p className="text-slate-700 text-ellipsis line-clamp-3 md:line-clamp-5">
                {data?.description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        {
          data?.catagory&&(
            <RecommendedProducts categoryName={`${data?.catagory}`} heading={"Recommended Products"}/>
          )
        }
     
      </div>
    </div>
  );
};

export default ProductDetails;
