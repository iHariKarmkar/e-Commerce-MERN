import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// Order place using COD method
const placeOrder = async (req, res) => {
    
    try {
        const { userId, items, amount, address, orderId } = req.body;

        const orderData = {
            userId,
            orderId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const order = new orderModel(orderData);
        await order.save();

        await userModel.findOneAndUpdate({_id: userId}, {cartData: {}});
        res.json({success: true, message: "Order Placed, Thanks!"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}

// Order place using Stripe (online payment) method
const cancelOrder = async (req, res) => {
    try {
        const {status, orderId} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: "Your Order Is Cancelled!"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// Order place using Razorpay (online payment) method
const placeOrderRazorpay = async (req, res) => {

}


// All orders to show in Admin Panel
const allOrders = async (req, res) => {
    try {
        
        const orders = await orderModel.find({});
        res.json({success: true, orders});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Show user's orders
const userOrders = async (req, res) => {
    try {  
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success: true, orders});

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// Update the status of order
const updateStatus = async (req, res) => {
    try {
        const {status, orderId}= req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Status Updated!"});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export {placeOrder, cancelOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus}