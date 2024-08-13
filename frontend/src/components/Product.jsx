import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import INRConverter from "../Helper/currencyConveter";

const Product = ({ data, getProducts }) => {
  const [showEdit, setShowEdit] = useState(false);
  const closeEdit = () => {
    setShowEdit(!showEdit);
  };
  return (
    <div className="flex flex-col  py-2">
      <div className="bg-slate-200 flex flex-col items-center gap-2  p-3 rounded w-[160px] h-[298px]">
        <div className="w-32 h-32 flex justify-center items-center ">
          <img
            src={data?.productImage[0]}
            alt=""
            className="mx-auto object-fill mix-blend-multiply h-full"
          />
        </div>
        <div className="h-[42px]">
          <p className=" text-ellipsis text-center line-clamp-2 text-[14px]">{data?.productName}</p>
        </div>
        <div>
          <p className="font-semibold">
            {INRConverter(data?.selling)}
            </p>
        </div>

        <div
          className="bg-red-400 mb-1 flex items-center gap-1 py-2  px-3 w-fit text-sm  rounded  cursor-pointer  hover:rounded-full"
          onClick={closeEdit}
        >
          <p>Edit Product</p>
          <div className="text-[13px]">
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      <div>
        {showEdit && (
          <AdminEditProduct
            editData={data}
            getProducts={getProducts}
            onClose={closeEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
