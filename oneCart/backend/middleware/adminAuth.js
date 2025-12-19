import jwt from 'jsonwebtoken'

export const adminAuth = async (req,res,next) => {
    try{
        const {token} =req.cookies

    if(!token) {
        return res.status(400).json({message:"Not Authorized Login Again"})

    }
    let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

    if(!verifyToken){
        return res.status(400).jason({message:"not Authorized Login Again, Invalid Token"})
    }
    req.adminEmail = process.env.ADMIN_EMAIL

    next()
    } catch(error){
    console.log("adminAuth error")
    return res.status(500).json({message:`adminAuth error`})
}

}