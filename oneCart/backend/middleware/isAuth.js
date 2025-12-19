import jwt from "jsonwebtoken"


export const isAuth = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        console.log("🔐 Token from cookie:", token);

        if(!token){
            return res.status(401).json({message:"user does not have token"})
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        if(!verifyToken){
            return res.status(401).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId
        next()

    } catch( error ){
    console.error("isAuth error :", error.message);
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }

}  
