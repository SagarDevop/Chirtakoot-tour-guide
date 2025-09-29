import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";


export const verifyjwt =async(req, res, next) => {

   try {
     const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","")
     console.log("Cookies received:", req.cookies);
     console.log("Authorization header:", req.headers.authorization);

 
     if(!token){
         throw new ApiError(
             400,
             "token is not present"
         )
     }
 
     const verifiedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

     if(!verifiedToken){
        throw new ApiError(
            502,
            "unable to verified the token"
        )
     }
 
     const user = await User.findById(verifiedToken.id).select("-password -accessToken")
     if(!user){
         throw new ApiError(401, "innvalid user token ")
        }
 
     req.user = user;
     next()
   } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Login First to....Proceed",
      error: error.message,
   });
    
   }


}