import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [productList, setProductList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendURL + "/api/product/list-products"
      );

      if (response.data.success) {
        setProductList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
        const response = await axios.delete(backendURL + `/api/product/remove/${productId}`, {headers: {token}})
        console.log(response);
        if(response.data.success){
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [productList]);

  return (
    <>
      <p className="mb-2">All Products List ({productList.length}) </p>
      {/* ---------- List Table Title ------------ */}
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b className="capitalize">image</b>
          <b className="capitalize">name</b>
          <b className="capitalize">category</b>
          <b className="capitalize">price</b>
          <b className="capitalize text-center">action</b>
          <b></b>
        </div>

        {/* ---------- Product List ---------- */}
        {
            productList.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
                    <img className="w-12" src={item.image[0]} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{currency}{item.price}</p>
                    <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
                </div>
            ))
        }
      </div>
    </>
  );
};

export default List;
