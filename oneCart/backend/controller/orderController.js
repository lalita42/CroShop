import Order from "../model/orderModel.js";
import User from "../model/userModel.js"
import Razorpay from 'razorpay'

import dotenv from 'dotenv'

dotenv.config()

const currency = 'inr'
const razorpayInstance = new Razorpay({
  key_id: process.env.Razorpay_KEY_ID,
  key_secret: process.env.Razorpay_KEY_SECRET,
});
export const placeOrder = async (req,res) =>{
    try{
        const{items , amount, address} = req.body;
        const userId = req.userId;
        const orderData={
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId,{cartData:{}})

        return res.status(201).json({message:'Order Place'})
    } catch(error){
        console.log(error)
        res.status(500).json({messge:'Order Place error'})
    }
}

export const userOrder =  async(req,res)=>{
    try{
        const userId = req.userId
        const orders = await Order.find({userId})
        return res.status (200).json(orders)
    } catch(error){
        console.log(error)
        return res.status(500).json({message:"userOrders error"})
    }
}


export const allOrders = async (req,res)=>{
    try{
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error){
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
    }
}

export const updateStatus = async (req,res)=>{
    try{
        const {orderId ,status} = req.body
        await Order.findByIdAndUpdate(orderId,{status})
        return res.status(201).json({message:'st'})
    } catch (error){
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}


export const placeOrderRazorpay = async (req,res) => {
    try{
        const {items, amount ,address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const options = {
            amount:amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }
        razorpayInstance.orders.create(options,(error,order) =>{
            if(error) {
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })
    } catch(error)
    {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}