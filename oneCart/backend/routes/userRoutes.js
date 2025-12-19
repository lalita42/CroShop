import express from "express"
import {isAuth} from "../middleware/isAuth.js"
import { getAdmin, getCurrentUser } from "../controller/userController.js"
import { adminAuth } from "../middleware/adminAuth.js"

export const userRoutes = express.Router()

userRoutes.post("/getcurrentuser", isAuth , getCurrentUser)
userRoutes.post("/getadmin",adminAuth , getAdmin)