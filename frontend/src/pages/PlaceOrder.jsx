import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
  });
  const {
    navigate,
    cartItems,
    getCartAmount,
    token,
    backendURL,
    setCartItems,
    products,
    deliveryFee,
    createOrderId,
    setOrderNo
  } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              // itemInfo.date = new Date.now();
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        orderId: createOrderId(),
        amount: getCartAmount() + deliveryFee
      };

      switch (paymentMethod) {
        case "cod":
          const response = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            setOrderNo(prev => prev+=1)
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        {/* --- LEFT SIDE --- */}
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="text"
          placeholder="Email"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="pincode"
            value={formData.pincode}
            type="number"
            placeholder="Pin Code"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="mobile"
          value={formData.mobile}
          type="phone"
          placeholder="Mobile Number"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* ----- RIGHT SIDE ----- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              // onClick={() => setPaymentMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <div className="flex flex-col">
                <img
                  src={assets.stripe_logo}
                  alt=""
                  className="h-5 mx-4 object-contain"
                />
                <p className="text-xs capitalize text-gray-400">
                  currently unavailable
                </p>
              </div>
            </div>
            <div
              // onClick={() => setPaymentMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-not-allowed"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <div className="flex flex-col">
                <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
                <p className="text-xs capitalize text-gray-400">
                  currently unavailable
                </p>
              </div>
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="uppercase text-gray-500 text-sm font-medium mx-4">
                cash on delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className="bg-black px-16 py-3 text-sm text-white uppercase"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
