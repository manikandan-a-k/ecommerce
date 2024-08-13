import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCatagory from "../Helper/productCatagory.js";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../Helper/uploadImage.js";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import ApiRequests from "../ApiRequests/index.js";


const AdminEditProduct = ({
editData,onClose,getProducts
}) => {
    const [productData, setProductData] = useState({
        _id:editData?._id,
        productName:editData?.productName,
        brandName:editData?.brandName,
        catagory:editData?.catagory,
        productImage:editData?.productImage||[],
        description:editData?.description,
        price:editData?.price,
        selling:editData?.selling,
      });
      
     
      const handleProducts = (e) => {
        const {name,value}=e.target
        setProductData((prev) => {
          return {
            ...prev,
            [name]:value
          };
        });
      };
      const handleImage = async (e) => {
        const file = e.target.files[0];
        
        const uploadImageClodinary = await uploadImage(file);
        setProductData((prev) => {
          return {
            ...prev,
            productName:uploadImageClodinary.display_name,
            productImage: [...prev.productImage, uploadImageClodinary.url],
          };
        });
      };
      const handleDelete = (index) => {
        const newProduct=[...productData.productImage]
        newProduct.splice(index,1)
        setProductData((prev) => {
          return {
            ...prev,
            productImage: [...newProduct],
          };
        });
        
      };
      const handleSubmit=async(e)=>{
       e.preventDefault()
       console.log(productData)
       const productReq=await fetch(ApiRequests.updateProducts.url,{
        method:ApiRequests.updateProducts.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(productData)
       })
       const productRes=await productReq.json()
    
       if(productRes.success)
       {
        toast.success(productRes.message)
        onClose()
        getProducts()
       }
       if(productRes.error)
       {
        toast.error(productRes.message)
       }
    
       
      
       
      }

  return (
    <div className=" fixed z-10 top-0 left-0 bg-slate-900 bg-opacity-55  p-3 flex justify-center items-center w-full h-full">
      <div className="bg-white h-full max-h-[70%] w-full max-w-2xl p-6 rounded overflow-hidden ">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl">Edit Products </h2>
          <div
            className="text-[25px] cursor-pointer font-bold hover:bg-red-600"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form className="mt-4 grid gap-4 h-full overflow-y-scroll" onSubmit={handleSubmit}>
        <div className="grid gap-2">
            <label value={productData.productImage} htmlFor="productImage">
              Product Image :
            </label>
            <label htmlFor="uploadImage">
              <div className="bg-slate-100 py-1 px-4 border w-full h-32 flex justify-center items-center cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                  <span className="text-4xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Image</p>
                  <input
                    type="file"
                    id="uploadImage"
                  
                    className="hidden"
                    onChange={handleImage}
                  />
                </div>
              </div>
            </label>
          </div>
          <div className="">
            <div className="flex gap-2 flex-wrap flex-grow-1">
              {productData?.productImage[0] ? (
                productData.productImage.map((el, i) => {
                  return (
                    <div className="relative">
                      <img
                        src={el}
                        alt="el"
                        width={100}
                        height={100}
                        className="bg-slate-100 border cursor-pointer"
                      />
                      <div
                        className="bg-red-500 absolute right-0 top-0 rounded p-1 cursor-pointer"
                        onClick={() => handleDelete(i)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-red-500 text-sm">Please Upload a Product</p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="productName" className="">Product Name :</label>
            <input
              id="productName"
              required
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={productData.productName}
              onChange={handleProducts}
              className="border px-3 bg-slate-100 py-1 w-full  rounded focus-visible:outline-2 focus-visible:outline-slate-400"
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="brandName">Brand Name :</label>
            <input
              id="brandName"
              name="brandName"
              required
              placeholder="Enter Brand Name"
              value={productData.brandName}
              onChange={handleProducts}
              className="border px-3 bg-slate-100 py-1 w-full  rounded focus-visible:outline-2 focus-visible:outline-slate-400"
            />
          </div>
          <div className="grid gap-2">
            <label value={productData.catagory} htmlFor="productCatagory">
              Catagory :
            </label>
            <select
              id="productCatagory"
              value={productData.catagory}
              onChange={handleProducts}
              required
              name="catagory"
              className="border px-3 cursor-pointer bg-slate-100 py-1 w-full rounded focus-visible:outline-2 focus-visible:outline-slate-400"
            >
              <option>Select Catagory</option>
              {productCatagory.map((data, i) => {
                return (
                  <option
                    className="cursor-pointer"
                    value={data.value}
                    name={data.label}
                    key={data.value + i}
                  >
                    {data.label}
                  </option>
                );
              })}
            </select>
          </div>
        
           <div className="grid gap-2">
            <label htmlFor="price">Price :</label>
            <input
              id="price"
              name="price"
              type="number"
              required
              placeholder="Enter Product Price"
              value={productData.price}
              onChange={handleProducts}
              className="border px-3 bg-slate-100 py-1 w-full  rounded focus-visible:outline-2 focus-visible:outline-slate-400"
            />
          </div>
           <div className="grid gap-2">
            <label htmlFor="selling">Selling Price :</label>
            <input
              id="selling"
              type="number"
              name="selling"
              required
              placeholder="Enter Product Selling Price"
              value={productData.selling}
              onChange={handleProducts}
              className="border px-3 bg-slate-100 py-1 w-full  rounded focus-visible:outline-2 focus-visible:outline-slate-400"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description">Description :</label>
            <textarea id="description" required value={productData.description} name="description" onChange={handleProducts} className="bg-slate-100 h-28 py-1 border px-3 w-full  rounded focus-visible:outline-2 focus-visible:outline-slate-400 resize-none" rows={3}>

            </textarea>

          </div>
          <button className="mb-10 mt-2 bg-[#f08804] py-2 px-4 rounded-md w-fit mx-auto hover:rounded-full hover:bg-red-400">
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminEditProduct

