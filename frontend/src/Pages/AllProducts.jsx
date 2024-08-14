import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import axios from "axios"
import Product from '../components/Product'
const AllProducts = () => {
  const [openProduct,setOpenProduct]=useState(false)
  const [allProducts,setAllProducts]=useState([])
  const getProducts=async()=>{
    await axios.get("/api/getProducts").then(({data})=>{
      
      setAllProducts(data?.data||[])
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div>
     <div className='bg-slate-300 py-2 px-4 flex justify-between items-center'>
      <h2 className='text-lg font-bold'>All Products</h2>
      <button onClick={()=>setOpenProduct(true)} className='bg-[f08804] h-full py-2 px-3 rounded-md  hover:rounded-full hover:bg-red-400'>Upload a Product</button>
     </div>
     {/* All Products */}
     <div className='flex  px-4 flex-wrap gap-4 py-4  h-[65vh] overflow-y-scroll '>
     
      {
        allProducts.map((product,index)=>{
            return(
                <Product data={product} key={index} getProducts={getProducts}/>
               
            )
        })
      }
     
    
     </div>
     {
      openProduct&&<UploadProduct getProducts={getProducts} onClose={()=>setOpenProduct(false)}/>
     }
    </div>
  )
}

export default AllProducts
