import express from 'express'
import { allOrders, placeOrder, updateStatus, userOrder } from '../controller/orderController.js'
// import { placeOrderRazorpay } from '../controller/orderController.js'
import {isAuth} from "../middleware/isAuth.js"
import {adminAuth} from "../middleware/adminAuth.js"

export const orderRoutes = express.Router()

orderRoutes.post("/placeorder" ,isAuth, placeOrder)
// orderRoutes.post("/placeorderbyrazorpay" ,isAuth, placeOrderRazorpay)
orderRoutes.post("/userorder" ,isAuth, userOrder)


orderRoutes.post("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)
