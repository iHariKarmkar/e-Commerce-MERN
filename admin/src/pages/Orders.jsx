import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendURL + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order page</h3>
      <div>
        {orders.reverse().map((order, index) => (
          <div
            className=" grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 "
            key={index}
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1)
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x{item.quantity} <span> {item.size} </span>{" "}
                      </p>
                    );
                  else
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x{item.quantity} <span> {item.size} </span>,{" "}
                      </p>
                    );
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.pincode}
                </p>
              </div>
              <p>{order.address.mobile}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px] capitalize">
                items: {order.items.length}
              </p>
              <p className="mt-3 capitalize">method: {order.paymentMethod}</p>
              <p className="capitalize">
                payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p className="capitalize">
                date: {new Date(order.date).toLocaleDateString()}{" "}
              </p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => updateStatus(event, order._id)}
              value={order.status}
              className={`p-2 font-semibold disabled:border-red-500 ${order.status === 'Cancelled' ? 'cursor-not-allowed' : ''}`}
              disabled={order.status === 'Cancelled' ? true : false}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
