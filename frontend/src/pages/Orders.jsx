import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendURL, token, navigate } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendURL + "/api/order/user-orders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderData(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("orders" + error.message);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.post(backendURL + "/api/order/cancel", {orderId, status: "Cancelled"}, {headers: {token}})
      if(response.data.success){
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      {/* Title section Start */}
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {/* Title Section Ends */}

      <div className="px-2 flex flex-col gap-4">
        {orderData.reverse().map((order, index) => (
          <div key={index} className="border border-l-4">
            <div>
              <div className="flex flex-col gap-5 items-start sm:flex-row sm:justify-between sm:items-center px-2 py-2">
                <div>
                  <p className="mt-1 text-xs sm:text-base">
                    Order Id:{" "}
                    <span className="text-gray-400">{order.orderId}</span>
                  </p>
                  <p className="text-xs sm:text-base">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-xs sm:text-base">
                    Total Amount:{" "}
                    <span className="text-gray-400">
                      {currency}
                      {order.amount}
                    </span>
                  </p>
                  <p className="text-xs sm:text-base">
                    Payment:{" "}
                    <span className="text-gray-400">{order.paymentMethod}</span>
                  </p>
                </div>
                <div className="flex justify-between gap-10 w-full sm:w-1/2">
                  <div className="flex items-center gap-2">
                    <p className={`min-w-2 h-2 rounded-full ${order.status === 'Cancelled' ? 'bg-red-500' : 'bg-green-500'}`}></p>
                    <p className="text-sm md:text-base">{order.status}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleCancel(order._id)} className={`border px-4 py-2 text-sm font-medium rounded-sm capitalize border-red-200 ${order.status === 'Cancelled' ? 'hidden' : ''}`}>
                      cancel
                    </button>
                    <button
                      onClick={loadOrderData}
                      className="border px-4 py-2 text-sm font-medium rounded-sm"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {order.items.map((item, index) => (
              <div key={index} className="px-2 py-2">
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.image[0]} alt="" className="w-16 sm:w-20" />
                  <div>
                    <p
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="sm:text-base font-medium cursor-pointer hover:text-gray-800"
                    >
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p className="text-lg">
                        {currency} {item.price * item.quantity}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
