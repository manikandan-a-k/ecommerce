import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import INRConverter from "../Helper/currencyConveter";
import ApiRequests from "../ApiRequests";
import { AiFillDelete } from "react-icons/ai";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCartCount } = useContext(Context);
  const loadingList = new Array(addToCartCount).fill(null);
  const { countAddToCartProducts } = useContext(Context);
  const navigate=useNavigate()
  const [log,setLog]=useState(true)
  const fetchProducts = async () => {
    await axios
      .get("/viewaddtocardproducts")
      .then(({ data }) => {
        setLoading(true);
        if (data.success) {
          setLoading(false);
          setData(data?.data);
          setLog(false)
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  useEffect(() => {
    
      fetchProducts();
      
    
    
  }, []);

 
 

  const increaseQuantity = async (id, qty) => {
    const dataReq = await fetch(ApiRequests.updateaddToCartProduct.url, {
      method: ApiRequests.updateaddToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const dataRes = await dataReq.json();
    if (dataRes.success) {
      fetchProducts();
    }
  };
  const decreaseQuantity = async (id, qty) => {
    if (qty != 1) {
      const dataReq = await fetch(ApiRequests.updateaddToCartProduct.url, {
        method: ApiRequests.updateaddToCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const dataRes = await dataReq.json();
      if (dataRes.success) {
        fetchProducts();
      }
    }
  };
  const handleDeleteProduct = async (id) => {
    const dataReq = await fetch(ApiRequests.deleteProduct.url, {
      method: ApiRequests.deleteProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const dataRes = await dataReq.json();
    if (dataRes.success) {
      fetchProducts();
      countAddToCartProducts();
    }
  };
  console.log("Cart",data)
  const totalQuantity = data.reduce((prev, cur) => prev + cur?.quantity, 0);
  const subTotal=data.reduce((prev,cur)=>prev+(cur?.productId.selling*cur?.quantity),0)
 

  return (
    
    <div className="container mx-auto p-4 h-[75vh] overflow-x-scroll">
      
      {/* No Products */}
      <div className="text-center">
        {data.length === 0 && !loading && (
          <div className="border gap-1 font-medium flex justify-center items-center bg-slate-200 rounded-md border-slate-200 h-32">
            No Product Added !
            <p className="text-4xl"><RiEmotionUnhappyLine/></p>
          </div>
        )}
        {/* Products */}
      </div>
      <div className=" flex justify-center flex-col lg:flex-row  lg:gap-4 ">
        <div className="w-full max-w-xl">
          {loading
            ? loadingList.map((el, i) => {
                return (
                  <div
                    key={el + "Add To Cart"}
                    className="bg-slate-200 h-32 border border-slate-300 my-2 animate-pulse"
                  ></div>
                );
              })
            : data.map((product, i) => {
                return (
                  <div
                    key={product.productId._id}
                    className="my-2  w-full h-32 rounded  bg-white border items-center grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt={product?.productId?.productImage[0]}
                        className=" w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-1 flex h-full flex-col gap-1 relative">
                      <div
                        onClick={() => handleDeleteProduct(product?._id)}
                        className="absolute cursor-pointer text-black border right-0 mr-12  md:mr-3 border-slate-500  h-7 w-7 px-1 flex justify-center items-center rounded text-center"
                      >
                        <AiFillDelete />
                      </div>
                      <h2 className="capitalize w-[170px] lg:w-[90%] text-[13px] lg:text-[18px] text-ellipsis line-clamp-1 font-medium text-slate-900">
                        {product?.productId?.productName}
                      </h2>
                      <p className="uppercase text-[10px] lg:text-[14px] text-slate-500">
                        {product?.productId?.catagory}
                      </p>
                      <p className="text-black font-semibold">
                        {INRConverter(product?.productId?.selling)}
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            decreaseQuantity(product?._id, product?.quantity)
                          }
                          className="w-7 h-7 border border-slate-400  flex justify-center items-center"
                        >
                          <GrSubtractCircle />
                        </button>
                        <span className="h-6 w-5 text-center">
                          {product?.quantity}
                        </span>
                        <button
                          onClick={() =>
                            increaseQuantity(product?._id, product?.quantity)
                          }
                          className=" text-lg h-7  w-7 border border-slate-400   flex justify-center items-center"
                        >
                          <IoIosAddCircleOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="mt-5 lg:mt-2 w-full max-w-sm">
          {loading ? (
            <div className="h-32 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (data.length!=0&&
            <div className="border border-slate-200 rounded-md lg:sticky top-2">
              <h2 className=" p-2 font-medium">Summary</h2>
              <div className="flex flex-col gap-1 pl-2 py-2">
                <div className=" flex gap-1 items-center">
                  <h2 className="font-medium w-[120px]">Total Quantity</h2>
                  <p className="">: {totalQuantity}</p>
                </div>
                <div className="flex gap-1">
                  <h2 className="font-medium w-[120px]">Sub Total</h2>
                  <p>: {INRConverter(subTotal)}</p>
                </div>
                
              </div>
              <button className="bg-[#ffb800] flex gap-1 justify-center  text-white w-full p-2">Proceed to Buy ({totalQuantity}) {totalQuantity==1?<p>Item</p>:<p>Items</p>}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
