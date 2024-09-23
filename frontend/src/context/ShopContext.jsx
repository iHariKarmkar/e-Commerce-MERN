import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryFee = 40;
  const [orderNo, setOrderNo] = useState(1)
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const createOrderId = () => {
    let orderId = "ORDER-";
    let paddedOrderNo = String(orderNo).padStart(5, '0');
    orderId += paddedOrderNo;
    console.log(orderNo);
    return orderId;
  }

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendURL + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    if(token){
      try {
        await axios.post(backendURL + '/api/cart/update', {itemId, size, quantity}, {headers: {token}});
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }

    return totalAmount;
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        backendURL + "/api/product/list-products"
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.get(backendURL + '/api/cart/get', {headers: {token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'));
    }
  }, []);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    token,
    setToken,
    createOrderId,
    setOrderNo
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
