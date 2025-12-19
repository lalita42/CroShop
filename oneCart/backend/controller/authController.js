import validator from "validator"
import User from "../model/userModel.js";
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";

export const registration = async(req,res) => {
    try{
        const{name,email ,password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter Valid Email"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter Strong Passward"})
        }

        let hashPassword =  await bcrypt.hash(password,10)

    const user = await User.create({name,email,password:hashPassword})
    const token = await genToken(user.id)
    res.cookie("token",token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)
    } catch(error){
      console.log("registration error",error.message);
      return res.status(500).json({message:`registration error ${error}`});
    }
}

export const login = async (req,res) => {
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User is not found"})
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Passward"})
        }
        let token = await genToken(user.id)
        res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({user})
    }catch (error){
        return res.status(500).json({ message: `login error: ${error.message}` })
    }
}

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // 🔐 Set to true in production
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.log("❌ Logout error:", error.message);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};




export const googleLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      // Hash the dummy password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with hashed dummy password
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    // Generate token
    const token = genToken(user.id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("googleLogin Error:", error.message);
    return res.status(500).json({ message: `googleLogin error: ${error.message}` });
  }
};

export const adminLogin = async (req,res) => {
  try{
    const { email , password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
      const token =  genToken1(email);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json({token});
    }
    return res.status(400).json({message:"invalid creadintials"})
  } catch (error){
    console.error("adminLogin Error:", error.message);
    return res.status(500).json({ message: `adminLogin error: ${error.message}` });
  }
}
